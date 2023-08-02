import { Configuration, OpenAIApi } from "openai";

const config = useRuntimeConfig();

const configuration = new Configuration({
  apiKey: config.openAi.secretKey,
});
const openai = new OpenAIApi(configuration);

export const getChatStream = async ({ messages }) => {
  console.log(messages, "messages from chat stream");
  try {
    // ----> generatePrompt, if we use this we don't need to parse streaming chunks
    //     function generatePrompt(animal) {
    //       const capitalizedAnimal =
    //         animal[0].toUpperCase() + animal.slice(1).toLowerCase();
    //       return `Suggest three names for an animal that is a superhero.
    //
    // Animal: Cat
    // Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
    // Animal: Dog
    // Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
    // Animal: ${capitalizedAnimal}
    // Names:`;
    //     }
    //
    //     const completion = await openai.createCompletion({
    //       model: "text-davinci-003",
    //       prompt: generatePrompt("Dog"),
    //       temperature: 0.6,
    //     });

    // -----> chat stream type
    const response = await openai.createChatCompletion(
      {
        max_tokens: 2048,
        model: "gpt-3.5-turbo", // or `gpt-3.5-turbo`
        temperature: 0.5,
        messages,
        stream: true,
      },
      { responseType: "stream" },
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
