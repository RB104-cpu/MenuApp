
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Alert } from 'react-native';
import DishCard from '../components/DishCard';

const COURSES = ['All', 'Starter', 'Main', 'Dessert'];

export default function ChefManagementScreen({ navigation, menuItems, onDelete }) {
  const [filterCourse, setFilterCourse] = useState('All');

  function getFilteredItems() {
    if (filterCourse === 'All') {
      return menuItems;
    }
    
    const filtered = [];
    for (let i = 0; i < menuItems.length; i++) {
      if (menuItems[i].course === filterCourse) {
        filtered.push(menuItems[i]);
      }
    }
    return filtered;
  }

  const filtered = getFilteredItems();

  function handleDelete(id) {
    Alert.alert('Delete Dish', 'Are you sure you want to remove this dish from the menu?', [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Delete', 
        style: 'destructive', 
        onPress: () => onDelete(id)
      }
    ]);
  }

  function handleAddNew() {
    navigation.navigate('DishForm');
  }

  function handleEdit(item) {
    navigation.navigate('DishForm', { item });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chef Menu Management</Text>
      <Text style={styles.subtitle}>Manage your menu items</Text>

      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Filter by course:</Text>
        <View style={styles.tabs}>
          {COURSES.map(course => (
            <Pressable 
              key={course} 
              onPress={() => setFilterCourse(course)} 
              style={[styles.tab, filterCourse === course && styles.tabActive]}
            >
              <Text style={[styles.tabText, filterCourse === course && styles.tabTextActive]}>
                {course}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.statsRow}>
        <Text style={styles.statsText}>Total Items: {menuItems.length}</Text>
        <Text style={styles.statsText}>Filtered: {filtered.length}</Text>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <DishCard
            item={item}
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No dishes in this category.</Text>
            <Text style={styles.emptySubtext}>Tap the + button to add your first dish!</Text>
          </View>
        }
        contentContainerStyle={{padding: 12, paddingBottom: 80}}
      />

      <Pressable style={styles.fab} onPress={handleAddNew}>
        <Text style={styles.fabText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f8' },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginTop: 14, color: '#333' },
  subtitle: { fontSize: 14, textAlign: 'center', color: '#666', marginTop: 4, marginBottom: 12 },
  filterSection: { backgroundColor: '#fff', marginHorizontal: 12, padding: 12, borderRadius: 10, elevation: 2, marginBottom: 8 },
  filterLabel: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8 },
  tabs: { flexDirection: 'row', justifyContent: 'space-around' },
  tab: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, backgroundColor: '#ececec', marginHorizontal: 4 },
  tabActive: { backgroundColor: '#6200ee' },
  tabText: { color: '#333', fontSize: 12 },
  tabTextActive: { color: '#fff' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 12, marginBottom: 8 },
  statsText: { fontSize: 14, fontWeight: '600', color: '#666' },
  fab: { position: 'absolute', right: 18, bottom: 28, backgroundColor: '#6200ee', width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center', elevation: 6 },
  fabText: { color: '#fff', fontSize: 36, lineHeight: 36 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 60 },
  emptyText: { fontSize: 16, color: '#666', marginBottom: 8 },
  emptySubtext: { fontSize: 14, color: '#999' }
});
