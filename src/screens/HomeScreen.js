
import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, ScrollView } from 'react-native';
import DishCard from '../components/DishCard';

const COURSES = ['All', 'Starter', 'Main', 'Dessert'];

export default function HomeScreen({ navigation, menuItems }) {
  const [active, setActive] = React.useState('All');

  const filtered = useMemo(() => {
    return active === 'All' ? menuItems : menuItems.filter(m => m.course === active);
  }, [active, menuItems]);

  const averagePrices = useMemo(() => {
    const courses = ['Starter', 'Main', 'Dessert'];
    const averages = {};
    
    for (let i = 0; i < courses.length; i++) {
      const course = courses[i];
      const courseItems = menuItems.filter(item => item.course === course);
      
      if (courseItems.length > 0) {
        let total = 0;
        for (let j = 0; j < courseItems.length; j++) {
          total += courseItems[j].price;
        }
        averages[course] = (total / courseItems.length).toFixed(2);
      } else {
        averages[course] = '0.00';
      }
    }
    
    return averages;
  }, [menuItems]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Christoffel's Menu - Guest View</Text>
      
      <View style={styles.averageSection}>
        <Text style={styles.averageTitle}>Average Prices by Course</Text>
        <View style={styles.averageContainer}>
          <View style={styles.averageItem}>
            <Text style={styles.averageLabel}>Starters</Text>
            <Text style={styles.averageValue}>R {averagePrices.Starter}</Text>
          </View>
          <View style={styles.averageItem}>
            <Text style={styles.averageLabel}>Mains</Text>
            <Text style={styles.averageValue}>R {averagePrices.Main}</Text>
          </View>
          <View style={styles.averageItem}>
            <Text style={styles.averageLabel}>Desserts</Text>
            <Text style={styles.averageValue}>R {averagePrices.Dessert}</Text>
          </View>
        </View>
      </View>

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
          <View style={styles.guestCard}>
            <Text style={styles.guestName}>{item.name}</Text>
            <Text style={styles.guestDesc}>{item.description}</Text>
            <Text style={styles.guestPrice}>R {Number(item.price).toFixed(2)}</Text>
          </View>
        )}
        ListEmptyComponent={<View style={styles.empty}><Text>No dishes available.</Text></View>}
        contentContainerStyle={{padding: 12}}
      />

      <Pressable style={styles.fab} onPress={() => navigation.navigate('ChefManagement')}>
        <Text style={styles.fabText}>Chef</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f8' },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginTop: 14 },
  averageSection: { backgroundColor: '#fff', margin: 12, padding: 16, borderRadius: 10, elevation: 2 },
  averageTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12, color: '#333' },
  averageContainer: { flexDirection: 'row', justifyContent: 'space-around' },
  averageItem: { alignItems: 'center' },
  averageLabel: { fontSize: 12, color: '#666', marginBottom: 4 },
  averageValue: { fontSize: 18, fontWeight: '700', color: '#2b6cb0' },
  tabs: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 12, paddingHorizontal: 8 },
  tab: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: '#ececec' },
  tabActive: { backgroundColor: '#2b6cb0' },
  tabText: { color: '#333' },
  tabTextActive: { color: '#fff' },
  guestCard: { backgroundColor: '#fff', borderRadius: 10, padding: 16, marginBottom: 12, elevation: 2 },
  guestName: { fontSize: 18, fontWeight: '700', color: '#333', marginBottom: 8 },
  guestDesc: { fontSize: 14, color: '#666', marginBottom: 8 },
  guestPrice: { fontSize: 16, fontWeight: '600', color: '#2b6cb0' },
  fab: { position: 'absolute', right: 18, bottom: 28, backgroundColor: '#6200ee', width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center', elevation: 6 },
  fabText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 40 }
});
