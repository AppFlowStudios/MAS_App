import { registerForPushNotificationsAsync } from '../lib/notifications';
import { ExpoPushToken } from 'expo-notifications';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthProvider';
import { err } from 'react-native-svg';
Notifications.setNotificationHandler({
  handleNotification : async () =>({
    shouldShowAlert : true,
    shouldPlaySound : false,
    shouldSetBadge : false
  })
})

const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [expoPushToken, setExpoPushToken] = useState<
    ExpoPushToken | undefined
  >();
  const { session } = useAuth()
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  console.log('session',session?.user.id)

  const savePushToken = async ( newToken : ExpoPushToken | undefined ) => {
    console.log('called savePushToken')
    console.log('newToken', newToken)
    setExpoPushToken(newToken)
    if( !newToken ){
      return;
    }
    if( session?.user.id ){
      console.log('session exits')
    }
    else{
      console.log('session fail')
    }
    const { error } = await supabase.from('profiles').update({  push_notification_token : newToken }).eq('id', session?.user.id)
    if( error ){
      console.log('error', error)
    }
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then( (token : any) => savePushToken(token) );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log('response', response);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  console.log('noti', notification);
  console.log(expoPushToken);

  return <>{children}</>;
};

export default NotificationProvider;