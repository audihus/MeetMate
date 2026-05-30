export function useProcessingStatus(id: string) {
  return {
    status: "idle",
    progress: 0,
    isLoading: false,
  };
}
