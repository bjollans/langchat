import StoryListFilterContextProvider from 'linguin-shared/context/storyListFilterContext';
import { SafeAreaView } from 'react-native';
import StoryList from '../components/StoryList';


export default function StoryListScreen({ navigation }) {
  return (
    <StoryListFilterContextProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StoryList navigation={navigation} />
      </SafeAreaView>
    </StoryListFilterContextProvider>
  );
}
