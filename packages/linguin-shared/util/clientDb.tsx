"use client";

import { PostgrestResponse, PostgrestSingleResponse } from "@supabase/supabase-js";
import { LinguinUser, LinguinUserProfile } from "linguin-shared/model/user";
import { Conversation, ConversationStatus } from "model/conversation";
import { Message, StoryEntity } from "model/translations";
import { Vocab } from "model/vocab";
import {
  QueryClient,
  QueryClientProvider as QueryClientProviderBase,
  UseQueryResult,
  useInfiniteQuery,
  useQuery
} from "react-query";
import { Language } from "types/language";
import { UserReadStatistics } from "util/userStatistics";
import supabase from "./supabase";

// React Query client
const client = new QueryClient();



/***************/
/**** USERS ****/
/***************/

export function useUser(uid: string) {
  return useQuery(
    ["user", { uid }],
    () =>
      supabase
        .from("users")
        .select(`*, customers ( * )`)
        .eq("id", uid)
        .single()
        .then(handle),
    { enabled: !!uid }
  );
}

// Update an existing user
export async function updateUser(uid: string, data: LinguinUser) {
  const response = await supabase
    .from("users")
    .update(data)
    .eq("id", uid)
    .then(handle);
  // Invalidate and refetch queries that could have old data
  await client.invalidateQueries(["user", { uid }]);
  return response;
}

export async function useUserProfile(uid: string) {
  return useQuery(
    ["userProfile", { uid }],
    () =>
      getUserProfile(uid),
    { enabled: !!uid }
  );
}

export async function getUserProfile(uid: string) {
  return supabase
    .from("userProfile")
    .select()
    .eq("id", uid)
    .single()
    .then(handle);
}

export async function updateUserProfileDb(uid: string, data: LinguinUserProfile) {
  const response = await supabase
    .from("userProfile")
    .upsert([{ id: uid, ...data }])
    .then(handle);
  await client.invalidateQueries(["userProfile", { uid }]);
  return response;
}



/***************/
/**** VOCAB ****/
/***************/

export function useVocab(uid: string): UseQueryResult<Array<Vocab>> {
  return useQuery(
    ["vocab"],
    () => supabase
      .from("vocab")
      .select()
      .eq("userId", uid)
      .eq("deleted", false)
      .order("currentLeitnerBoxNumber", { ascending: true })
      .then(handle),
  );
}

export async function updateVocab(data: Vocab) {
  if (!data.id) throw new Error("Vocab ID is required");
  client.setQueryData(["vocab"], (oldData: any) => {
    const filteredOldData = oldData.filter((v: Vocab) => v.id != data.id);
    return data.deleted ? filteredOldData : [...filteredOldData, data];
  });
  const response = await supabase
    .from("vocab")
    .update(data)
    .eq("id", data.id)
    .then(handle);
  await client.invalidateQueries(["vocab"]);
  return response;
}

export async function createVocab(data: Vocab) {
  client.setQueryData(["vocab"], (oldData: any) => [...oldData, data]);
  const response = await supabase
    .from("vocab")
    .insert([data])
    .then(handle);
  await client.invalidateQueries(["vocab"]);
  return response;
}



/*****************/
/**** STORIES ****/
/*****************/

export function useStoryTranslations({ language = "hi" }) {
  return useQuery(
    ["allStories"],
    () => supabase
      .from("storyTranslations")
      .select()
      .eq("targetLanguage", language)
      .then(handle),
  );
}

export function useStoryTranslationFromStoryIdAndLanguage(storyId, targetLanguage) {
  return useQuery(
    ["allStories", storyId, targetLanguage],
    () => supabase
      .from("storyTranslations")
      .select()
      .eq("targetLanguage", targetLanguage)
      .eq("storyId", storyId)
      .then(handle),
  );
}

export function useVisibleStoryIds({ language = "hi" }) {
  return useQuery(
    ["storyIds"],
    () => supabase
      .from("storyTranslations")
      .select("storyId")
      .eq("targetLanguage", language)
      .eq("visible", true)
      .then(handle),
  );
}

const PAGE_LENGTH = 5;
function getFetchVisibleStoriesPageFunction(language: Language) {
  return async function fetchVisibleStoriesPage({ pageParam = 0 }) {
    const { data, error } = await supabase
      .from(`stories_list_${language}`)
      .select()
      .range(pageParam, pageParam + PAGE_LENGTH - 1);

    if (error) console.log('error', error);
    return data;
  };
}

export function useVisibleStoriesInfinite(language: Language) {
  return useInfiniteQuery(['visibleStories' + language], getFetchVisibleStoriesPageFunction(language), {
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage || lastPage.length === 0) return undefined; // No more pages
      return pages.length * PAGE_LENGTH; // Adjust according to your pagination logic
    },
  });
}

export function useStory(storyId: string): UseQueryResult<StoryEntity> {
  return useQuery(
    ["story", { storyId }],
    () => supabase
      .from("stories")
      .select()
      .eq("id", storyId)
      .single()
      .then(handle),
    { enabled: !!storyId }
  );
}

export function useStoryTranslation(storyTranslationId: string) {
  return useQuery(
    ["storyTranslation", { storyTranslationId }],
    () => supabase
      .from("storyTranslations")
      .select("*")
      .eq("id", storyTranslationId)
      .single()
      .then(handle),
    { enabled: !!storyTranslationId }
  );
}

export function useCollectionNames() {
  return useQuery(
    ["collectionNames"],
    () => supabase
      .from("collections")
      .select('name')
      .then(handle),
  );
}


export function useStoryCollections(storyId: string) {
  return useQuery(
    ["collections", { storyId }],
    () => supabase
      .from("storiesToCollections")
      .select("collectionName")
      .eq("storyId", storyId)
      .then(handle));
}

export function getAvailableStoryDifficultyLevels() {
  return supabase.rpc("get_available_story_difficulty_levels").then(handle);
}

export function useAvailableStoryDifficultyLevels() {
  return useQuery(
    ["availableStoryDifficultyLevels"],
    () => getAvailableStoryDifficultyLevels(),
  );
}

/*************************/
/**** User Statistics ****/
/*************************/

export function useUserHasReadStory(storyId: string, userId: string): UseQueryResult<Array<boolean>> {
  return useQuery(
    ["userStoriesRead", { storyId, userId }],
    () =>
      supabase
        .from("userStoriesRead")
        .select()
        .eq("storyId", storyId)
        .eq("userId", userId)
        .then(handle),
    { enabled: !!storyId && !!userId }
  );
}

export function useUserStoriesRead(userId: string) {
  return useQuery(
    ["userStoriesRead", { userId }],
    () =>
      supabase
        .from("userStoriesRead")
        .select("storyId")
        .eq("userId", userId)
        .then(handle),
    { enabled: !!userId }
  );
}

export function markUserStoryRead(storyId: string, userId: string) {
  client.setQueryData(["userStoriesRead", { storyId, userId }], [true]);
  client.setQueryData(["userStoriesRead", { userId }], (oldData: any) => oldData ? [...oldData, storyId] : [storyId]);
  const response = supabase
    .from("userStoriesRead")
    .insert([{ storyId, userId }])
    .then(handle);
  return response;
}

export function unmarkUserStoryRead(storyId: string, userId: string) {
  client.setQueryData(["userStoriesRead", { storyId, userId }], [false]);
  client.setQueryData(["userStoriesRead", { userId }], (oldData: any) => oldData ? oldData.filter((id: string) => id != storyId) : []);
  const response = supabase
    .from("userStoriesRead")
    .delete()
    .eq("storyId", storyId)
    .eq("userId", userId)
    .then(handle);
  return response;
}

export function userWordsSeen(userId: string, targetLanguage: Language) {
  return useQuery(
    ["userWordsSeen", { userId }],
    () =>
      supabase
        .from("userReadStatistics")
        .select("wordsSeen")
        .eq("userId", userId)
        .eq("targetLanguage", targetLanguage)
        .then(handle),
    { enabled: !!userId }
  );
}

export async function upsertUserReadStatistics(userId: string, targetLanguage: Language, data: UserReadStatistics) {
  const response = supabase
    .from("userReadStatistics")
    .upsert({ userId, targetLanguage, ...data })
    .eq("userId", userId)
    .then(handle);
  await client.invalidateQueries(["userWordsSeen", userId]);
  return response;
}


/**********************************/
/**** MESSAGES & CONVERSATIONS ****/
/**********************************/

export function useMessagesForConversation(conversationId: string) {
  return useQuery(
    ["messages"],
    () =>
      supabase
        .from("messages")
        .select()
        .eq("conversationId", conversationId)
        .order("createdAt", { ascending: true })
        .then(handle),
    { refetchInterval: 3000, enabled: !!conversationId }
  );
}

export function useConversationsByUser(uid: string): UseQueryResult<any> {
  return useQuery(
    ["items", { uid }],
    () =>
      supabase
        .from("conversations")
        .select()
        .eq("userId", uid)
        .single()
        .then(handle),
    { enabled: !!uid }
  );
}

export async function sendMessage(message: Message) {
  client.setQueryData(["messages"], (oldData: any) => [...oldData, message]);
  const response = await supabase.from("messages").insert([message]).then(handle);
  await client.invalidateQueries(["messages"]);
  return response;
}

export async function createConversation(data: Conversation) {
  const response = await supabase.from("conversations").insert([data]).then(handle);
  await client.invalidateQueries(["conversations"]);
  return response;
}

export async function updateConversationStatus(conversationId: string, status: ConversationStatus) {
  const response = supabase.from("conversations").update({ status }).eq("id", conversationId).then(handle);
  await client.invalidateQueries(["conversations"]);
  return response;
}




/*****************/
/**** HELPERS ****/
/*****************/

function handle(response: PostgrestResponse<any> | PostgrestSingleResponse<any>): any {
  if (response.error) throw response.error;
  return response.data;
}

export function QueryClientProvider(props: any): JSX.Element {
  return (
    <QueryClientProviderBase client={client} >
      {props.children}
    </QueryClientProviderBase>
  );
}
