import { View, Text } from 'react-native'
import React from 'react'
import { Modal, Portal } from 'react-native-paper';

type AlertBellModalProp = {
    setVisible : ( visible : boolean ) => void
    visible : boolean
    salah : string
}
const AlertBellModal = ({ setVisible, visible, salah }: AlertBellModalProp) => {

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);  
    return (
        <Portal>
          <Modal visible={visible} onDismiss={hideModal}>
            <View className='w-[90%] bg-white'>
                <View>
                    
                </View>
            </View>
          </Modal>
        </Portal>
    );
}

export default AlertBellModal