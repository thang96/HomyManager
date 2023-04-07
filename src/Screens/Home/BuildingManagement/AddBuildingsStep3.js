import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  LogBox,
} from 'react-native';
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
  updateAmenity,
  updateServices,
} from '../../../Store/slices/commonSlice';
import {token} from '../../../Store/slices/tokenSlice';
import RenderService from '../../../Components/ComponentHome/RenderService';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import {CreateNewBuildingApi} from '../../../Api/Home/BuildingApis/BuildingApis';
import CustomStepAppBar from '../../../Components/CommonComponent/CustomStepAppBar';
import CustomModalNotify from '../../../Components/CommonComponent/CustomModalNotify';
import {updateStatus} from '../../../Store/slices/statusSlice';
import {PostImageBuildingApi} from '../../../Api/Home/FileDataApis/FileDataApis';
import ComponentInput from '../../../Components/CommonComponent/ComponentInput';
import {StraightLine} from '../../../Components/CommonComponent/LineComponent';

const AddBuildingsStep3 = props => {
  const navigation = useNavigation();
  const [loadingStep3, setLoadingStep3] = useState(false);
  const dispatch = useDispatch();
  const [modalNotify, setModalNotify] = useState(false);
  const createBuildingInfor = useSelector(commonState);
  const serviceSelect = useSelector(serviceState);
  const amenitySelect = useSelector(amenityState);
  const tokenStore = useSelector(token);

  const [notice, setNotice] = useState('');
  const [billNotice, setBillNotice] = useState('');

  const [listService, setListService] = useState([]);
  const [listAmenity, setListAmenity] = useState([]);

  useEffect(() => {
    LogBox.ignoreAllLogs();
    dispatch(updateAmenity([]));
    dispatch(updateServices([]));
  }, []);

  useMemo(() => {
    let eachService = [];
    if (serviceSelect.length > 0) {
      serviceSelect.map((item, index) => {
        if (item?.isCheck == true) {
          eachService.push(item);
        }
      });
      setListService(eachService);
    }
  }, [serviceSelect]);

  useMemo(() => {
    let eachAmenityIds = [];
    if (amenitySelect.length > 0) {
      amenitySelect.map((item, index) => {
        if (item?.isCheck == true) {
          eachAmenityIds.push(item);
        }
      });
      setListAmenity(eachAmenityIds);
    }
  }, [amenitySelect]);

  const renderPaidSevice = (item, index) => {
    return (
      <RenderService
        name={item?.name}
        fee={item?.fee}
        calculateUnit={item?.calculateUnit}
      />
    );
  };

  const renderFreeSevice = (item, index) => {
    return <RenderAmenity label={item?.name} />;
  };

  const createNewBuilding = async () => {
    setModalNotify(false);
    setLoadingStep3(true);
    let eachServiceIds = [];
    let eachAmenityIds = [];
    listService.map((item, index) => {
      eachServiceIds.push(item?.id);
    });
    listAmenity.map((item, index) => {
      eachAmenityIds.push(item?.id);
    });
    let data = {
      ...createBuildingInfor,
      serviceIds: eachServiceIds,
      amenityIds: eachAmenityIds,
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
                  dispatch(updateStatus('updateHouse'));
                  setLoadingStep3(false);
                  navigation.navigate('BuildingManager');
                }
              })
              .catch(error => {
                alert(error);
              });
          } else {
            dispatch(updateStatus('updateHouse'));
            setLoadingStep3(false);
            navigation.navigate('BuildingManager');
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
          title={'Tạo tòa nhà'}
          label={'Bạn có muốn tạo tòa nhà này ?'}
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

      <ScrollView
        nestedScrollEnabled={true}
        keyboardDismissMode="none"
        style={styles.eachContainer}>
        <CustomSuggest
          label={'Vui lòng điền đầy đủ thông tin! Mục có dấu * là bắt buộc'}
        />

        <CustomTextTitle
          label={'Dịch vụ có phí'}
          labelButton={'Thêm'}
          icon={icons.ic_plus}
          onPress={() => navigation.navigate('Service')}
        />
        <View>
          <ScrollView horizontal={true} style={{width: '100%'}}>
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
          </ScrollView>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textPicker}>Đã chọn </Text>
          <Text style={styles.pickerTotal}>{`${listService.length}`}</Text>
        </View>

        {StraightLine()}

        <CustomTextTitle
          label={'Tiện ích miễn phí'}
          labelButton={'Thêm'}
          icon={icons.ic_plus}
          onPress={() => navigation.navigate('Utilities')}
        />
        <View>
          <ScrollView horizontal={true} style={{width: '100%'}}>
            {listAmenity.length > 0 ? (
              <FlatList
                listKey="listAmenity"
                horizontal={false}
                scrollEnabled={false}
                numColumns={2}
                keyExtractor={key => `${key?.id}`}
                data={listAmenity}
                renderItem={({item, index}) => renderFreeSevice(item, index)}
              />
            ) : null}
          </ScrollView>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textPicker}>Đã chọn </Text>
          <Text style={styles.pickerTotal}>{`${listAmenity.length}`}</Text>
        </View>

        {StraightLine()}

        <CustomTextTitle label={'Lưu ý'} />

        <ComponentInput
          type={'inputNote'}
          title={'Lưu ý của tòa nhà'}
          placeholder={'Nhập lưu ý của tòa nhà'}
          value={notice}
          onChangeText={text => setNotice(text)}
        />
        <ComponentInput
          viewComponent={{marginTop: 10}}
          type={'inputNote'}
          title={'Ghi chú hóa đơn'}
          placeholder={'Nhập ghi chú hóa đơn'}
          value={billNotice}
          onChangeText={text => setBillNotice(text)}
        />

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
  textPicker: {fontSize: 11, fontWeight: '400', color: 'orange'},
  pickerTotal: {
    fontSize: 15,
    color: 'orange',
    fontWeight: '600',
  },
});
export default AddBuildingsStep3;
