import React, {useEffect, useState} from 'react';
import {StyleSheet, Keyboard, View, Text, Dimensions} from 'react-native';
import {colors, icons, images, svgs} from '../../Constants';
import {useNavigation} from '@react-navigation/native';
import CustomAppBar from '../../Components/CustomAppBar';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {ScrollView} from 'react-native-virtualized-view';
import CustomButton from '../../Components/CustomButton';
import CustomButtonValue from '../../Components/CustomButtonValue';
const avatar =
  'https://i.natgeofe.com/k/63b1a8a7-0081-493e-8b53-81d01261ab5d/red-panda-full-body_4x3.jpg';
const StatisticScreen = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width - 40;
  const [revenue, setRevenue] = useState(1);
  const [issue, setIssue] = useState(1);
  const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: 'white',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `${colors.mainColor}`,
    // color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 0.7,
    useShadowColorFromDataset: false, // optional
  };
  const revenueData = {
    labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50],
      },
    ],
  };

  const dataIssue = [
    {
      name: 'Đã khắc phục',
      issue: 7,
      color: colors.mainColor,
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Chưa khắc phục',
      issue: 3,
      color: colors.backgroundOrange,
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  return (
    <View style={styles.container}>
      <CustomAppBar
        svgLeft={svgs.LogoApp}
        label={'Thống kê'}
        iconRight={icons.ic_bell}
        pressIconRight={() => navigation.navigate('NotificationScreen')}
        iconSecondRight={avatar}
        pressSeccodIconRight={() => navigation.navigate('StackAccountPage')}
        pressLogo={() => navigation.navigate('StackHomepage')}
      />
      <ScrollView style={{paddingHorizontal: 10, paddingTop: 10}}>
        <View style={[styles.shadowView, styles.viewBarChart]}>
          <View style={styles.viewRowBetween}>
            <View>
              <Text style={styles.label}>Doanh thu</Text>
              <Text style={styles.title}>120000000 VNĐ</Text>
            </View>
            <View style={styles.viewRow}>
              <CustomButton
                label={'D'}
                styleLabel={{color: 'white', fontWeight: '600'}}
                styleButton={[
                  styles.styleButton,
                  {
                    backgroundColor:
                      revenue == 1 ? '#0191FF' : 'rgba(1, 145, 255, 0.5)',
                  },
                ]}
                onPress={() => setRevenue(1)}
              />
              <CustomButton
                label={'M'}
                styleLabel={{color: 'white', fontWeight: '600'}}
                styleButton={[
                  styles.styleButton,
                  {
                    backgroundColor:
                      revenue == 2 ? '#0191FF' : 'rgba(1, 145, 255, 0.5)',
                  },
                ]}
                onPress={() => setRevenue(2)}
              />
              <CustomButton
                label={'Y'}
                styleLabel={{color: 'white', fontWeight: '600'}}
                styleButton={[
                  styles.styleButton,
                  {
                    backgroundColor:
                      revenue == 3 ? '#0191FF' : 'rgba(1, 145, 255, 0.5)',
                  },
                ]}
                onPress={() => setRevenue(3)}
              />
            </View>
          </View>
          <BarChart
            style={{flex: 1, marginVertical: 20}}
            data={revenueData}
            width={screenWidth}
            height={220}
            // yAxisLabel="VNĐ"
            chartConfig={chartConfig}
            verticalLabelRotation={0}
          />
        </View>
        <CustomButtonValue
          styleView={{marginTop: 20, marginBottom: 10}}
          type={'button'}
          placeholder={'Chọn ngày'}
          value={'3/11/2023'}
          icon={icons.ic_calendar}
        />
        <View style={[styles.shadowView, styles.viewBarChart]}>
          <View style={styles.viewRowBetween}>
            <Text style={styles.title}>Sự cố</Text>
            <View style={styles.viewRow}>
              <CustomButton
                label={'D'}
                styleLabel={{color: 'white', fontWeight: '600'}}
                styleButton={[
                  styles.styleButton,
                  {
                    backgroundColor:
                      issue == 1 ? '#0191FF' : 'rgba(1, 145, 255, 0.5)',
                  },
                ]}
                onPress={() => setIssue(1)}
              />
              <CustomButton
                label={'M'}
                styleLabel={{color: 'white', fontWeight: '600'}}
                styleButton={[
                  styles.styleButton,
                  {
                    backgroundColor:
                      issue == 2 ? '#0191FF' : 'rgba(1, 145, 255, 0.5)',
                  },
                ]}
                onPress={() => setIssue(2)}
              />
              <CustomButton
                label={'Y'}
                styleLabel={{color: 'white', fontWeight: '600'}}
                styleButton={[
                  styles.styleButton,
                  {
                    backgroundColor:
                      issue == 3 ? '#0191FF' : 'rgba(1, 145, 255, 0.5)',
                  },
                ]}
                onPress={() => setIssue(3)}
              />
            </View>
          </View>
          <PieChart
            data={dataIssue}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            accessor={'issue'}
            backgroundColor={'transparent'}
            paddingLeft={'15'}
            center={[0, 0]}
            absolute
          />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
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
  viewBarChart: {
    minHeight: 300,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
  },
  viewRowBetween: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  viewRow: {flexDirection: 'row', alignItems: 'center'},
  label: {color: 'rgba(22, 58, 95, 0.7)'},
  title: {color: '#163A5F', fontWeight: '600', fontSize: 17},
  styleButton: {width: 30, height: 40, borderRadius: 8, marginLeft: 10},
});
export default StatisticScreen;
