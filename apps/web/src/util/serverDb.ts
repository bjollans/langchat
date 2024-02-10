import { PostgrestResponse, PostgrestSingleResponse } from "@supabase/supabase-js";
import supabase from "./supabase";
  
  // Fetch user data (non-hook)
  // Useful if you need to fetch data from outside of a component
  export function getUser(uid: string) {
    return supabase
      .from("users")
      .select(`*, customers ( * )`)
      .eq("id", uid)
      .single()
      .then(handle);
  }
  
  export function getVisibleStoryIds() {
    return supabase
      .from("stories")
      .select("id")
      .eq("visible", true)
      .then(handle)
  }
  
  export function getStoriesByIds(storyIds: Array<string>) {
    return supabase
      .from("stories")
      .select()
      .in("id", storyIds)
      .then(handle);
  }
  
  export function getStoriesOrderedByCustom(property: string, ascending: boolean) {
    return supabase
      .from("stories")
      .select('title, id, difficulty, visible, wordCount, content, previewImageUrl, storiesToCollections ( collectionName ), wordsInStory, createdAt')
      .order(property, { ascending })
      .then(handle);
  }
  
  export function getStory(storyId: string) {
    return supabase
      .from("stories")
      .select()
      .eq("id", storyId)
      .single()
      .then(handle);
  }
  
  export function getStoryCollections(storyId: string) {
    return supabase
          .from("storiesToCollections")
          .select("collectionName")
          .eq("storyId", storyId)
          .then(handle);
  }
  
  export function getStoriesCollections(storyIds: Array<string>) {
    return supabase
      .from("storiesToCollections")
      .select()
      .in("storyId", storyIds)
      .then(handle);
  }
  
  export function getCollectionNames() {
    return supabase
      .from("collections")
      .select('name')
      .then(handle);
  }
  
  export function getAvailableStoryDifficultyLevels() {
    return supabase.rpc("get_available_story_difficulty_levels").then(handle);
  }
  
  
  
  
  /*****************/
  /**** HELPERS ****/
  /*****************/
  
  function handle(response: PostgrestResponse<any> | PostgrestSingleResponse<any>): any {
    if (response.error) throw response.error;
    return response.data;
  }