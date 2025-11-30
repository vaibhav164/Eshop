import {Text, StyleSheet} from 'react-native';
import React from 'react';

const Header = ({title}) => {
  return <Text style={styles.header}>{title}</Text>;
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 15,
  },
});
export default Header;
