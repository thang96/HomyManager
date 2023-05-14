import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  HomeScreen,
  BuildingManager,
  AddBuildings,
  AddBuildingsStep2,
  AddBuildingsStep3,
  Service,
  Utilities,
  AddService,
  AddUtilities,
  BuildingInformation,
  FloorInformation,
  RoomInformation,
  AddRoom,
  CreateContract,
  TenantList,
  AddNewTenant,
  ServiceManager,
  UtilitiesManager,
  ContractManagement,
  InvoiceManagement,
  TenantManager,
  ServiceDetail,
  UserManager,
  ManagerList,
  AddNewManager,
  TenantDetail,
  ManagerDetail,
  ContractDetail,
  PaymentManagement,
  AddPayment,
  ListPaymentSelect,
  InvoiceDetail,
  InvoiceUnpaidDetail,
  InvoicePaidDetail,
  AmenityDetail,
  PaymentDetail,
  QuickAddRoom,
  EditRoomInformation,
  EditHouseInformation,
  WaterAndElectricityManager,
  ConfirmWaterAndElectricity,
  DetailedContractTerms,
  CreateContractFromRoom,
  EditContract,
} from '../../../Screens';
const Stack = createStackNavigator();
const StackHomepage = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        component={HomeScreen}
        name={'HomeScreen'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={BuildingManager}
        name={'BuildingManager'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ContractManagement}
        name={'ContractManagement'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={InvoiceManagement}
        name={'InvoiceManagement'}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        component={InvoiceDetail}
        name={'InvoiceDetail'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={InvoiceUnpaidDetail}
        name={'InvoiceUnpaidDetail'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={InvoicePaidDetail}
        name={'InvoicePaidDetail'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={PaymentManagement}
        name={'PaymentManagement'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={AddPayment}
        name={'AddPayment'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={PaymentDetail}
        name={'PaymentDetail'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ListPaymentSelect}
        name={'ListPaymentSelect'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={AddBuildings}
        name={'AddBuildings'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={AddBuildingsStep2}
        name={'AddBuildingsStep2'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={AddBuildingsStep3}
        name={'AddBuildingsStep3'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={Service}
        name={'Service'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ServiceManager}
        name={'ServiceManager'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={AddService}
        name={'AddService'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ServiceDetail}
        name={'ServiceDetail'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={Utilities}
        name={'Utilities'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={AmenityDetail}
        name={'AmenityDetail'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={UtilitiesManager}
        name={'UtilitiesManager'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={AddUtilities}
        name={'AddUtilities'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={BuildingInformation}
        name={'BuildingInformation'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={FloorInformation}
        name={'FloorInformation'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={RoomInformation}
        name={'RoomInformation'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={AddRoom}
        name={'AddRoom'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={QuickAddRoom}
        name={'QuickAddRoom'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={EditRoomInformation}
        name={'EditRoomInformation'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={EditHouseInformation}
        name={'EditHouseInformation'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={CreateContract}
        name={'CreateContract'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ContractDetail}
        name={'ContractDetail'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={DetailedContractTerms}
        name={'DetailedContractTerms'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={CreateContractFromRoom}
        name={'CreateContractFromRoom'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={EditContract}
        name={'EditContract'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={UserManager}
        name={'UserManager'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ManagerList}
        name={'ManagerList'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={AddNewManager}
        name={'AddNewManager'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ManagerDetail}
        name={'ManagerDetail'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={TenantList}
        name={'TenantList'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={AddNewTenant}
        name={'AddNewTenant'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={TenantManager}
        name={'TenantManager'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={TenantDetail}
        name={'TenantDetail'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={WaterAndElectricityManager}
        name={'WaterAndElectricityManager'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ConfirmWaterAndElectricity}
        name={'ConfirmWaterAndElectricity'}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default StackHomepage;
