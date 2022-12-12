import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { map, capitalize } from 'lodash';

export default function Stack({ stats }) {
  const barStyles = (number) => {
    const color = number > 49 ? '#00ac17' : '#ff3e3e';
    return {
      backgroundColor: color,
      width: `${number}%`,
    }
  }
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Base Stats</Text>
      {map(stats, (item, index) => (
        <View key={index} style={styles.block}>
          <View style={styles.blockTitle}>
            <Text style={styles.statName}>{capitalize(item.stat.name)}</Text>
          </View>
          <View style={styles.blockInfo}>
            <Text style={styles.number}>{item.base_stat}</Text>
            <View style={styles.bgBar}>
              <View style={[styles.bar, barStyles(item.base_stat)]} />
            </View>
          </View>
        </View>
      ))
      }
    </View >
  )
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 60
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 5
  },
  block: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  blockTitle: {
    width: '30%',
  },
  statName: {
    fontSize: 14,
    color: '#6b6b6b'
  },
  blockInfo: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  number: {
    width: '12%',
    fontSize: 14
  },
  bgBar: {
    backgroundColor: '#dedede',
    width: '88%',
    height: 10,
    borderRadius: 20,
    overflow: 'hidden'
  },
  bar: {
    height: 10,
    borderRadius: 20,
  }
}) 