import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AppBarComponent from '../../../components/appBarComponent/AppBarComponent';
import ButtonComponent from '../../../components/commonComponent/ButtonComponent';
import {colors, icons, images} from '../../../constants';

const NotificationScreen = (props: any) => {
  const navigation: any = useNavigation();
  const [data, setData] = useState(FAKE_DATA);

  const renderItem = (item: any, index: number) => {
    return (
      <View style={{marginBottom: 10}}>
        <Text style={styles.time}>{item?.time}</Text>
        {item?.event.map((item: any, index: number) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('DetailNotification', item)}
              key={`${index.toString()}`}
              style={[styles.buttonRender, styles.shadowView]}>
              <ButtonComponent
                disabled={true}
                icon={icons.ic_bell}
                styleIcon={{tintColor: colors.mainColor, width: 22, height: 22}}
                styleButton={styles.viewBell}
              />
              <View>
                <Text style={styles.title}>{item?.title}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.duration}>{`${item?.time}  `}</Text>
                  <Text style={styles.duration}>{item?.day}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <AppBarComponent
        iconLeft={icons.ic_back}
        pressIconLeft={() => navigation.goBack()}
        label={'Thông báo'}
      />
      <ScrollView style={{paddingHorizontal: 10, paddingTop: 10}}>
        <View>
          <ScrollView horizontal={true} style={{width: '100%'}}>
            {data && (
              <FlatList
                data={data}
                keyExtractor={key => key?.time}
                renderItem={({item, index}) => renderItem(item, index)}
              />
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
  time: {color: '#374047', fontWeight: '600', fontSize: 15},
  shadowView: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    margin: 1,
    elevation: 5,
  },
  buttonRender: {
    height: 64,
    borderWidth: 1,
    backgroundColor: 'white',
    marginBottom: 10,
    borderColor: 'white',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewBell: {
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: '#EDFCFB',
    marginHorizontal: 10,
  },
  title: {fontSize: 15, fontWeight: '600', color: '#374047'},
  duration: {fontSize: 13, fontWeight: '400', color: '#374047'},
});
export default NotificationScreen;

const FAKE_DATA = [
  {
    time: '03-10-2023',
    event: [
      {
        title: 'Tiêu đề thông báo',
        time: '16h30',
        day: '03-10-2023',
        content: 'Test render nội dung thông báo',
      },
      {
        title: 'Tiêu đề thông báo',
        time: '20h30',
        day: '03-10-2023',
        content: 'Test render nội dung thông báo',
      },
    ],
  },
  {
    time: '02-10-2023',
    event: [
      {
        title: 'Tiêu đề thông báo',
        time: '9h30',
        day: '02-10-2023',
        content: 'Test render nội dung thông báo',
      },
      {
        title: 'Tiêu đề thông báo',
        time: '10h30',
        day: '02-10-2023',
        content: 'Test render nội dung thông báo',
      },
      {
        title: 'Tiêu đề thông báo',
        time: '12h30',
        day: '02-10-2023',
        content: 'Test render nội dung thông báo',
      },
    ],
  },
];
