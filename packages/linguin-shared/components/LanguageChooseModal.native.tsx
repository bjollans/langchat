import { useUserProfileContext } from 'linguin-shared/context/userProfileContext';
import React, { useMemo } from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';

export default function LanguageChooseModal({ visible, close }) {
    const { availableLanguagesMap, updateUserProfile } = useUserProfileContext();
    const items = useMemo(() => {
        let items: any[] = [];
        for (const [key, value] of Object.entries(availableLanguagesMap)) {
            items.push({ label: value, value: key });
        }
        return items;
    }, [availableLanguagesMap]);

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={() => close()}
        >
            <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)' }}>
                <TouchableOpacity style={{ height: '100%', width: '100%' }} onPress={() => close()}>
                    <View style={{
                        marginHorizontal: 'auto',
                        marginVertical: 'auto',
                        backgroundColor: '#F8FAFC',
                        padding: 16,
                        width: '83.333333%',
                        borderRadius: 8,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 3
                    }}>
                        <Text style={{
                            fontSize: 20,
                            textAlign: 'center',
                            fontWeight: 'bold'
                        }}>Choose a Language</Text>
                        <FlatList
                            style={{
                                height: '60%',
                                paddingHorizontal: 24,
                                paddingVertical: 8,
                                borderWidth: 1,
                                borderColor: '#374151',
                                borderRadius: 8,
                                margin: 16
                            }}
                            data={items}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => {
                                    updateUserProfile({ targetLanguage: item.value });
                                    close();
                                }} style={{
                                    borderBottomWidth: 1,
                                    marginVertical: 4,
                                    padding: 8,
                                    borderBottomColor: '#9CA3AF'
                                }}>
                                    <Text style={{
                                        fontSize: 24,
                                        fontWeight: 'bold',
                                        letterSpacing: -0.8
                                    }}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}