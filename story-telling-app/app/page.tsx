"use client";

import { useState } from "react";
import { useChat } from "ai/react";

export default function Chat() {
  const { messages, append, isLoading } = useChat();

  const characters = [
    { emoji: "🧙", value: "Fantasy" },
    { emoji: "🕵️", value: "Mystery" },
    { emoji: "💑", value: "Romance" },
    { emoji: "🚀", value: "Sci-Fi" },
  ];

  const [state, setState] = useState({
    character: "",
    isModalOpen: false,
    newCharacter: {
      name: "",
      description: "",
      personality: "",
    },
  });

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (name.startsWith("new")) {
      setState({
        ...state,
        newCharacter: {
          ...state.newCharacter,
          [name.replace("new", "").toLowerCase()]: value,
        },
      });
    } else {
      setState({
        ...state,
        [name]: value,
      });
    }
  };

  return (
    <main className="mx-auto w-full min-h-screen flex flex-col bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500">
      <div className="flex-1 p-4 m-4 pt-16">
        <div className="flex flex-col items-center justify-center space-y-8 text-white">
          <div className="space-y-2 text-center">
            <h2 className="text-4xl font-bold">Story Telling App</h2>
            <p className="text-lg text-zinc-500 dark:text-zinc-400">
              Customize the story by selecting the main character of your choice. Or create your own!
            </p>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-6 w-full max-w-2xl relative">
            <h3 className="text-2xl font-semibold text-center">Main Character</h3>

            <button
              onClick={() => setState({ ...state, isModalOpen: true })}
              className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-sm"
            >
              Create New
            </button>

            <div className="flex flex-wrap justify-center">
              {characters.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    value={value}
                    name="character"
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg disabled:opacity-50"
            disabled={isLoading || !state.character}
            onClick={() =>
              append({
                role: "user",
                content: `Generate a story with the main character ${state.character}`,
              })
            }
          >
            Generate Story
          </button>

          <div
            hidden={
              messages.length === 0 ||
              messages[messages.length - 1]?.content.startsWith("Generate")
            }
            className="bg-opacity-25 bg-gray-700 rounded-lg p-6 w-full max-w-2xl text-lg"
          >
            {messages[messages.length - 1]?.content}
          </div>
        </div>
      </div>

      {state.isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-lg p-6 w-full max-w-md">
            <h4 className="text-xl font-semibold mb-4">Create New Character</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="newName"
                  value={state.newCharacter.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="newDescription"
                  value={state.newCharacter.description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Personality</label>
                <textarea
                  name="newPersonality"
                  value={state.newCharacter.personality}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setState({ ...state, isModalOpen: false })}
                  className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Here you can handle saving the new character
                    setState({ ...state, isModalOpen: false });
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
