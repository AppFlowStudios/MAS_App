import { View, Text, Button, Pressable, Image } from 'react-native'
import React, {forwardRef, useCallback, useEffect, useMemo, useRef, useState, } from 'react'
import BottomSheet, { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useAuth } from '@/src/providers/AuthProvider';
import { FileObject } from '@supabase/storage-js';
import { supabase } from '@/src/lib/supabase';
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from 'expo-file-system';
import { Icon, TextInput } from 'react-native-paper';
import { decode } from 'base64-arraybuffer';

type CreatePlaylistBottomSheetProp = {
    playlist_img : string
    playlist_name : string
}
type Ref = BottomSheetModal
const CreatePlaylistBottomSheet = forwardRef<Ref, {}>((props, ref) =>{
    const [ playlistImg, setPlaylistImg ] = useState<ImagePicker.ImagePickerAsset>()
    const [ playlistName, setPlaylistName ] = useState<string>()
    const [ isReady, setIsReady ] = useState(false)
    const { session } = useAuth()
    const [files, setFiles] = useState<FileObject[]>([])

    const handleClose = () => {
        if (ref && 'current' in ref && ref.current) {
            setPlaylistImg(undefined)
            setPlaylistName("")
            ref.current.dismiss();
        }
    };
    
    const loadImages = async () => {
      const { data } = await supabase.storage.from('files').list(session?.user.id)
      if (data) {
        setFiles(data)
      }
    }
    
    const uploadImage = async () => {
        if( playlistImg ){
        const base64 = await FileSystem.readAsStringAsync(playlistImg.uri, { encoding: 'base64' });
        const filePath = `${session?.user.id}/${new Date().getTime()}.${playlistImg.type === 'image' ? 'png' : 'mp4'}`;
        const contentType = playlistImg.type === 'image' ? 'image/png' : 'video/mp4';
        const { data : image, error :image_upload_error } = await supabase.storage.from('user_playlist_img').upload(filePath, decode(base64));

        if( image ){
            const { data : playlist_img_url} = await supabase.storage.from('user_playlist_img').getPublicUrl(image?.path)
            if( playlist_img_url ) {
                const { error } = await supabase.from("user_playlist").insert({ user_id : session?.user.id, playlist_name : playlistName, playlist_img: playlist_img_url.publicUrl})
            }
        }
        handleClose()
        }
    }

    const onSelectImage = async () => {
      const options : ImagePicker.ImagePickerOptions = {
        mediaTypes : ImagePicker.MediaTypeOptions.Images,
        allowsEditing : true
      }

      const result = await ImagePicker.launchImageLibraryAsync(options)

      if( !result.canceled ){
        const img = result.assets[0]
        setPlaylistImg(img)
      }
    }
    const snapPoints = useMemo(() => ["50%", "95%"], []);
    const [ visible, setVisible ] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const renderBackDrop = useCallback( (props : any ) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props}/> , [])

    useEffect(() => {
        if( playlistImg && playlistName ){
            setIsReady(true)
        }else{
            setIsReady(false)
        }
    }, [playlistName, playlistImg])

    return(
        <BottomSheetModal
        ref={ref}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={{backgroundColor: "#0D509D"}}
        handleIndicatorStyle={{backgroundColor: "white"}}
        backdropComponent={renderBackDrop}
        {...props}
        >
            <View className='flex-row justify-between items-center px-5'> 
                <Button title='Cancel' onPress={handleClose} />
                <Text className='text-xl font-bold text-white'> New Playlist </Text>
                <Button title='Create' disabled={!isReady} onPress={uploadImage}/>
            </View>
            
            <View className='border items-center'>
                <Pressable className='h-[140] w-[150] border items-center justify-center rounded-xl bg-white' onPress={onSelectImage}>
                    {playlistImg ? <Image source={{ uri : playlistImg.uri || undefined}} style={{width: "100%", height:"100%", objectFit: "contain"}} /> : <Icon source={"camera"} size={60} color='red'/>}
                </Pressable>


                <TextInput
                    placeholder='Playlist Title'
                    style={{ width : "95%", height: 50 }}
                    outlineStyle={{ borderWidth: 0 }}
                    value={playlistName}
                    onChangeText={setPlaylistName}
                />
            </View>

        </BottomSheetModal>
    )
})

export default CreatePlaylistBottomSheet