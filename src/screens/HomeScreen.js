
import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Alert } from 'react-native';
import DishCard from '../components/DishCard';

const COURSES = ['All', 'Starter', 'Main', 'Dessert'];

export default function HomeScreen({ navigation, menuItems, onDelete }) {
  const [active, setActive] = React.useState('All');

  const filtered = useMemo(() => {
    return active === 'All' ? menuItems : menuItems.filter(m => m.course === active);
  }, [active, menuItems]);

  const confirmDelete = (id) => {
    Alert.alert('Delete', 'Are you sure you want to delete this dish?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => onDelete(id) }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Christoffel's Menu</Text>
      <View style={styles.tabs}>
        {COURSES.map(c => (
          <Pressable key={c} onPress={() => setActive(c)} style={[styles.tab, active === c && styles.tabActive]}>
            <Text style={[styles.tabText, active === c && styles.tabTextActive]}>{c}</Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        renderItem={({item}) => (
          <DishCard
            item={item}
            onEdit={() => navigation.navigate('DishForm', { item })}
            onDelete={() => confirmDelete(item.id)}
          />
        )}
        ListEmptyComponent={<View style={styles.empty}><Text>No dishes yet. Tap + to add.</Text></View>}
        contentContainerStyle={{padding: 12}}
      />

      <Pressable style={styles.fab} onPress={() => navigation.navigate('DishForm')}>
        <Text style={styles.fabText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f8' },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginTop: 14 },
  tabs: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 12, paddingHorizontal: 8 },
  tab: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: '#ececec' },
  tabActive: { backgroundColor: '#2b6cb0' },
  tabText: { color: '#333' },
  tabTextActive: { color: '#fff' },
  fab: { position: 'absolute', right: 18, bottom: 28, backgroundColor: '#2b6cb0', width: 64, height:64, borderRadius: 32, justifyContent: 'center', alignItems: 'center', elevation: 6 },
  fabText: { color: '#fff', fontSize: 36, lineHeight: 36 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 40 }
});
