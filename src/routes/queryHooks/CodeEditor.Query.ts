import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useCodeEditorState = () => {
  return useQuery({
    queryKey: ["editorState"],
    queryFn: () => "write", // default value
    staleTime: Infinity, // prevent refetch
  });
};

export const useSetCodeEditorState = () => {
  const queryClient = useQueryClient();

  return (state: "write" | "import") => {
    queryClient.setQueryData(["editorState"], state);
  };
};