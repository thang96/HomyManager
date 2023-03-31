import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Text, TextInput, FlatList} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import CustomSuggest from '../../../Components/CommonComponent/CustomSuggest';
import CustomTwoButtonBottom from '../../../Components/CommonComponent/CustomTwoButtonBottom';
import {icons, colors} from '../../../Constants';
import RenderAmenity from '../../../Components/ComponentHome/RenderAmenity';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import {useDispatch, useSelector} from 'react-redux';
import {
  commonState,
  serviceState,
  amenityState,
} from '../../../Store/slices/commonSlice';
import {token} from '../../../Store/slices/tokenSlice';
import RenderService from '../../../Components/ComponentHome/RenderService';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import {CreateNewBuildingApi} from '../../../Api/Home/BuildingApis/BuildingApis';
import CustomStepAppBar from '../../../Components/CommonComponent/CustomStepAppBar';
import CustomModalNotify from '../../../Components/CommonComponent/CustomModalNotify';
import {updateStatus} from '../../../Store/slices/statusSlice';
import {PostImageBuildingApi} from '../../../Api/Home/FileDataApis/FileDataApis';

const AddBuildingsStep3 = props => {
  const navigation = useNavigation();
  const [loadingStep3, setLoadingStep3] = useState(false);
  const dispatch = useDispatch();
  const [modalNotify, setModalNotify] = useState(false);
  const createBuildingInfor = useSelector(commonState);
  const serviceSelect = useSelector(serviceState);
  const amenitySelect = useSelector(amenityState);
  const tokenStore = useSelector(token);

  const [serviceIds, setServiceIds] = useState([]);
  const [amenityIds, setAmenityIds] = useState([]);
  const [notice, setNotice] = useState('');
  const [billNotice, setBillNotice] = useState('');

  const [listService, setListService] = useState([]);
  const [listAmenity, setListAmenity] = useState([]);

  useEffect(() => {
    let eachService = [];
    if (serviceSelect.length > 0) {
      serviceSelect.map((item, index) => {
        if (item?.isCheck == true) {
          eachService.push(item);
        }
      });
      setListService(eachService);
    }
    let eachAmenityIds = [];
    if (amenitySelect.length > 0) {
      amenitySelect.map((item, index) => {
        if (item?.isCheck == true) {
          eachAmenityIds.push(item);
        }
      });
      setListAmenity(eachAmenityIds);
    }
  }, [serviceSelect, amenitySelect]);

  useEffect(() => {
    const setListData = () => {
      let eachServiceIds = [];
      let eachAmenityIds = [];
      listService.map((item, index) => {
        eachServiceIds.push(item?.id);
      });
      listAmenity.map((item, index) => {
        eachAmenityIds.push(item?.id);
      });
      setServiceIds(eachServiceIds);
      setAmenityIds(eachAmenityIds);
    };
    setListData();
  }, [listService, listAmenity]);

  const renderPaidSevice = (item, index) => {
    return (
      <View>
        {item?.isCheck == true && (
          <RenderService
            label={item?.name}
            value={item?.fee}
            icon={item?.icon}
          />
        )}
      </View>
    );
  };

  const renderFreeSevice = (item, index) => {
    return <RenderAmenity label={item?.name} />;
  };

  const createNewBuilding = async () => {
    setModalNotify(false);
    setLoadingStep3(true);
    let data = {
      ...createBuildingInfor,
      serviceIds: serviceIds,
      amenityIds: amenityIds,
      notice: notice,
      billNotice: billNotice,
    };
    await CreateNewBuildingApi(tokenStore, data)
      .then(async res => {
        if (res?.status == 200) {
          let hauseId = res?.data?.id;
          let hauseImages = createBuildingInfor?.hauseImages;
          if (hauseImages?.length > 0) {
            await PostImageBuildingApi(tokenStore, hauseId, hauseImages)
              .then(res => {
                if (res?.status == 200) {
                  dispatch(updateStatus(false));
                  setLoadingStep3(false);
                  navigation.navigate('BuildingManager');
                }
              })
              .catch(error => {
                alert(error);
              });
          }
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      {loadingStep3 && <CustomLoading />}
      {modalNotify && (
        <CustomModalNotify
          title={'Thông báo'}
          label={'Bạn có một thông báo mới,vui lòng xác nhận'}
          modalVisible={modalNotify}
          onRequestClose={() => setModalNotify(false)}
          pressConfirm={() => createNewBuilding()}
        />
      )}
      <CustomStepAppBar
        iconLeft={icons.ic_back}
        label={'Thiết lập dịch vụ'}
        iconRight={icons.ic_bell}
        pressIconRight={() => navigation.navigate('NotificationScreen')}
        iconSecondRight={icons.ic_moreOption}
        pressSeccodIconRight={async () => {}}
        pressIconLeft={() => navigation.goBack()}
        step={3}
      />

      <ScrollView style={[styles.eachContainer]}>
        <CustomSuggest
          label={'Vui lòng điền đầy đủ thông tin! Mục có dấu * là bắt buộc'}
        />

        <CustomTextTitle
          label={'Dịch vụ có phí'}
          labelButton={'Thêm'}
          icon={icons.ic_plus}
          onPress={() => navigation.navigate('Service')}
        />

        {listService.length > 0 ? (
          <FlatList
            listKey="listService"
            horizontal={false}
            scrollEnabled={false}
            numColumns={2}
            keyExtractor={key => `${key?.id}`}
            data={listService}
            renderItem={({item, index}) => renderPaidSevice(item, index)}
          />
        ) : null}

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textPicker}>Đã chọn </Text>
          <Text style={styles.pickerTotal}>{`${listService.length}`}</Text>
        </View>

        <View style={styles.line} />

        <CustomTextTitle
          label={'Tiện ích miễn phí'}
          labelButton={'Thêm'}
          icon={icons.ic_plus}
          onPress={() => navigation.navigate('Utilities')}
        />

        {listAmenity.length > 0 ? (
          <FlatList
            listKey="listAmenity"
            style={{justifyContent: 'space-between'}}
            horizontal={false}
            scrollEnabled={false}
            numColumns={3}
            keyExtractor={key => `${key?.id}`}
            data={listAmenity}
            renderItem={({item, index}) => renderFreeSevice(item, index)}
          />
        ) : null}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textPicker}>Đã chọn </Text>
          <Text style={styles.pickerTotal}>{`${listAmenity.length}`}</Text>
        </View>

        <View style={styles.line} />

        <CustomTextTitle label={'Lưu ý'} />

        <Text style={[styles.label]}>Lưu ý của tòa nhà</Text>
        <View style={styles.viewTextInput}>
          <TextInput
            style={{color: 'black', width: '100%'}}
            multiline={true}
            placeholder="Nhập lưu ý của tòa nhà"
            defaultValue={notice}
            onEndEditing={evt => setNotice(evt.nativeEvent.text)}
          />
        </View>

        <Text style={[styles.label, {marginTop: 20}]}>Ghi chú hóa đơn</Text>
        <View style={styles.viewTextInput}>
          <TextInput
            style={{color: 'black'}}
            multiline={true}
            placeholder="Nhập ghi chú hóa đơn"
            defaultValue={billNotice}
            onEndEditing={evt => setBillNotice(evt.nativeEvent.text)}
          />
        </View>

        <View style={{marginBottom: 56}} />
        <CustomTwoButtonBottom
          leftLabel={'Trở lại'}
          rightLabel={'Hoàn tất'}
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => setModalNotify(true)}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  eachContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: colors.backgroundGrey,
  },
  content: {color: 'rgba(127, 138, 147, 1)', fontSize: 13},
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'black',
    marginVertical: 20,
    alignSelf: 'center',
  },
  textPicker: {fontSize: 15, fontWeight: '400', color: 'rgba(254, 122, 55, 1)'},
  pickerTotal: {
    fontSize: 15,
    color: 'rgba(254, 122, 55, 1)',
    fontWeight: '600',
  },
  viewTextInput: {
    paddingHorizontal: 10,
    borderWidth: 1,
    marginTop: 5,
    borderRadius: 5,
    borderColor: colors.borderInput,
    height: 120,
    backgroundColor: 'white',
  },
  label: {fontSize: 15, color: 'rgba(55, 64, 71, 1)', fontWeight: '400'},
});
export default AddBuildingsStep3;
