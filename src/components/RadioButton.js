import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from '../theme/ThemeContext';

const RadioButton = ({ label, selected, onSelect }) => {
  const theme = useContext(ThemeContext);

  return (
    <TouchableOpacity style={styles.container} onPress={onSelect}>
      <View style={[styles.outerCircle, { borderColor: theme.color }]}>
        {selected && <View style={[styles.innerCircle, { backgroundColor: theme.color }]} />}
      </View>
      <Text style={[styles.label, { color: theme.color }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  outerCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  label: {
    fontSize: 18,
  },
});

export default RadioButton;