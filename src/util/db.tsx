import {
  useQuery,
  QueryClient,
  QueryClientProvider as QueryClientProviderBase,
  QueryClientProviderProps,
  UseQueryResult,
} from "react-query";
import supabase from "./supabase";
import { Conversation, ConversationStatus } from "model/conversation";
import { PostgrestResponse, PostgrestSingleResponse } from "@supabase/supabase-js";
import { Message, StoryText } from "model/translations";
import { Vocab } from "model/vocab";

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
      .order("lastPracticed", { ascending: true })
      .then(handle),
  );
}

export async function updateVocab(data: Vocab) {
  if (!data.id) throw new Error("Vocab ID is required");
  const response = await supabase
    .from("vocab")
    .update(data)
    .eq("id", data.id)
    .then(handle);
  await client.invalidateQueries(["vocab"]);
  return response;
}

export async function createVocab(data: Vocab) {
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

export function useStories() {
  return useQuery(
    ["stories"],
    () => supabase
      .from("stories")
      .select()
      .order("wordCount", { ascending: true })
      .then(handle),
  );
}

export function useStory(storyId: string): UseQueryResult<StoryText> {
  return useQuery(
    ["story", { storyId }],
    () =>
      supabase
        .from("stories")
        .select()
        .eq("id", storyId)
        .single()
        .then(handle),
    { enabled: !!storyId }
  );
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

export function QueryClientProvider(props: QueryClientProviderProps): JSX.Element {
  return (
    <QueryClientProviderBase client={client} >
      {props.children}
    </QueryClientProviderBase>
  );
}
