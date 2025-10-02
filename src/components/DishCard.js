
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function DishCard({ item, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
        <Text style={styles.course}>{item.course} • R {Number(item.price).toFixed(2)}</Text>
      </View>
      <View style={styles.actions}>
        <Pressable onPress={onEdit} style={styles.actionBtn}><Text style={styles.actionText}>Edit</Text></Pressable>
        <Pressable onPress={onDelete} style={[styles.actionBtn, {backgroundColor:'#fee'}]}><Text style={[styles.actionText, {color:'#c00'}]}>Delete</Text></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor:'#fff', borderRadius:10, padding:12, marginBottom:12, flexDirection:'row', justifyContent:'space-between', elevation:2 },
  left: { flex:1 },
  name: { fontSize:16, fontWeight:'700' },
  desc: { color:'#666', marginTop:6 },
  course: { marginTop:8, fontWeight:'600' },
  actions: { justifyContent:'space-between', marginLeft:12 },
  actionBtn: { paddingVertical:6, paddingHorizontal:10, backgroundColor:'#eef', borderRadius:6, marginBottom:6 },
  actionText: { color:'#1b3a8a', fontWeight:'600' }
});
