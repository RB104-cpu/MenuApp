
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

const COURSES = ['Starter', 'Main', 'Dessert'];

export default function DishFormScreen({ navigation, route, addMenuItem, updateMenuItem }) {
  const editing = !!route.params?.item;
  const item = route.params?.item;

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [course, setCourse] = useState('Main');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (editing && item) {
      setName(item.name || '');
      setDesc(item.description || '');
      setCourse(item.course || 'Main');
      setPrice(item.price != null ? item.price.toString() : '');
    }
  }, [editing, item]);

  const validate = () => {
    if (name.trim().length < 2) return 'Name must be at least 2 characters.';
    if (desc.trim().length < 10) return 'Description must be at least 10 characters.';
    const p = parseFloat(price);
    if (isNaN(p) || p <= 0) return 'Price must be a number greater than 0.';
    return null;
  };

  const save = () => {
    const err = validate();
    if (err) return Alert.alert('Validation', err);
    const payload = { name: name.trim(), description: desc.trim(), course, price: parseFloat(parseFloat(price).toFixed(2)) };
    if (editing) {
      payload.id = item.id;
      updateMenuItem(payload);
    } else {
      addMenuItem(payload);
    }
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex:1}}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Dish Name</Text>
        <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="E.g., Pan-seared Salmon" />

        <Text style={styles.label}>Description</Text>
        <TextInput value={desc} onChangeText={setDesc} style={[styles.input, {height:110}]} placeholder="Short description" multiline />

        <Text style={styles.label}>Course</Text>
        <View style={styles.row}>
          {COURSES.map(c => (
            <Pressable key={c} onPress={() => setCourse(c)} style={[styles.chip, course === c && styles.chipActive]}>
              <Text style={course === c ? styles.chipTextActive : styles.chipText}>{c}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Price (ZAR)</Text>
        <TextInput keyboardType="numeric" value={price} onChangeText={setPrice} style={styles.input} placeholder="e.g., 120.00" />

        <View style={{flexDirection:'row', marginTop:18}}>
          <Pressable style={styles.btn} onPress={() => navigation.goBack()}>
            <Text style={styles.btnText}>Cancel</Text>
          </Pressable>
          <Pressable style={[styles.btn, {backgroundColor:'#2b6cb0'}]} onPress={save}>
            <Text style={[styles.btnText, {color:'#fff'}]}>{editing ? 'Save Changes' : 'Save'}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff', paddingBottom: 60 },
  label: { fontWeight: '600', marginTop: 12 },
  input: { backgroundColor: '#f2f2f2', padding: 12, borderRadius: 8, marginTop: 6 },
  row: { flexDirection: 'row', marginTop: 8 },
  chip: { paddingVertical: 8, paddingHorizontal: 12, backgroundColor: '#eee', borderRadius: 20, marginRight: 8 },
  chipActive: { backgroundColor: '#2b6cb0' },
  chipText: { color: '#333' },
  chipTextActive: { color: '#fff' },
  btn: { flex:1, padding:12, borderRadius:8, backgroundColor:'#eee', marginRight:8, alignItems:'center' },
  btnText: { fontWeight:'600' }
});
