import { useTargetLanguageContext } from 'linguin-shared/context/targetLanguageContext';
import React, { useMemo } from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';


export default function LanguageChooseModal({ visible, close }) {
    const { languageToLanguageString, setTargetLanguage } = useTargetLanguageContext();
    const items = useMemo(() => {
        let items = [];
        for (const [key, value] of Object.entries(languageToLanguageString)) {
            items.push({ label: value, value: key });
        }
        return items;
    }, [languageToLanguageString]);

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={() => close()}
        >
            <View className="w-full h-full" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
                <TouchableOpacity className='h-full w-full' onPress={() => close()}>
                    <View className='mx-auto my-auto bg-slate-50 p-4 w-5/6 rounded-lg shadow'>
                        <Text className='text-xl text-center font-bold'>Choose a Language</Text>
                            <FlatList
                                className='h-3/5 px-6 py-2 border border-slate-700 rounded-lg m-4'
                                data={items}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => {
                                        setTargetLanguage(item.value);
                                        close();
                                    }} className='border-b my-1 p-2 border-slate-400'>
                                        <Text className='text-2xl font-bold tracking-tight'>{item.label}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                    </View>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}