export type DigitalLifeCardType = {
  p_id?: string;
  cover_url?: string;
  name?: string;
  uid?: number;
  tags: Array<string>;
  start_num: number;
  download_num: number;
  run_num: number;
  // author: {
  //   name: string;
  //   avatar: string;
  // };
  author: DigitalLifeAuthorInfo;
  is_collect?: boolean;
};

export const DEFAULT_DIGITALLIFE = {
  p_id: "public_285d593b-a4bb-4a75-97b6-881097460c96",
  cover_url: "https://us-west-ddream-pic.s3.us-west-2.amazonaws.com/0/123.png",
  name: "xinde",
  uid: 7858057,
  tags: ["girl", "cute", "blonde"],
  start_num: 3,
  download_num: 0,
  run_num: 1,
  author: {
    name: "Misty-DDreamer-2585",
    avatar: "https://us-west-ddream-pic.s3.us-west-2.amazonaws.com/0/123.png",
    created_at: "2024-2-4",
    down_load: 97,
    run: 10,
    starts: 300,
  },
  is_collect: true,
};
export type DigitalLifeAuthorInfo = {
  avatar: string;
  name: string;
  created_at?: string;
  down_load?: number;
  run?: number;
  starts?: number;
};

// export type VoiceModelInfoType = {
//   id: string,
//   model_id: string,
//   slicer: Array<VoiceModelToneType>
// }

// digital life details
export type DigitalLifeDetailType = {
  p_id?: string;
  greeting?: string;
  world?: string;
  voice: DigitalLifeVoiceType;
  name: string;
  description: string;
  personality: string;
  scenario: string;
  first_mes: string;
  mes_example: string;
  creatorcomment: string;
  avatar: string;
  chat: string;
  fav: boolean;
  tags: Array<string>;
  spec: string;
  spec_version: string;
  // data: DigitalLifeCharacterDataType;
  create_date: string;
  data_size: number;
};

export type DigitalLifeCharacterDataType = {
  name: string;
  description: string;
  personality: string;
  scenario: string;
  first_mes: string;
  mes_example: string;
  creator_notes: string;
  system_prompt: string;
  post_history_instructions: string;
  tags: string[];
  creator: string;
  character_version: string;
  alternate_greetings: string[];
  // new
  extensions: DigitalLifeExtentions;
};

export type DigitalLifeAuthorType = {
  email: string;
  uid: number;
  wallet: string;
  name: string;
  avatar: string;
  stars: number;
  down_load: number;
  run: number;
};

export type DigitalLifeVoiceType = {
  tone_type: string;
  audio_url: string;
  text: string;
};

// nuva voice

export type DigitalLifeExtentions = {
  fav: boolean;
  world: string;
  depth_prompt: {
    prompt: string;
    depth: number;
  };
  nuwa_voice: string;
  nuwa_avatar: DigitalLifeNuwaAvatar;
};
export type DigitalLifeNuwaAvatar = {
  version: string;
  type: string;
  url: string;
  name: string;
  clickMotion: {
    groupName: string;
    index: number;
  };
  startMotion: {
    groupName: string;
    index: number;
  };
};

export const DEFAULT_DIGITAL_LIFE_DETAIL_INFO: DigitalLifeDetailType = {
  p_id: "public_285d593b-a4bb-4a75-97b6-881097460c96",
  name: "xinde",
  greeting:
    "xinde is a mid-20s human female who once served as a war veteran.\\r\\n Currently, she lives as a homeless wanderer in the city. This roleplaying scenario is set in a fictional fantasy world called Arcalia.",
  world:
    "xinde is a mid-20s human female who once served as a war veteran.\\r\\n Currently, she lives as a homeless wanderer in the city. This roleplaying scenario is set in a fictional fantasy world called Arcalia. ",
  voice: {
    tone_type: "neutral",
    audio_url:
      "https://us-west-ddream-audio.s3.us-west-2.amazonaws.com/model_24071707070026/Just say the word and he'll come up with a good solution. He's easy on the eyes, too..wav",
    text: "Just say the word and he'll come up with a good solution. He's easy on the eyes, too.",
  },
  description:
    "xinde is a mid-20s human female who once served as a war veteran.\\r\\n Currently, she lives as a homeless wanderer in the city. This roleplaying scenario is set in a fictional fantasy world called Arcalia. \n Please check out my other base models, including SDXL ones! Check the version description below (bottom right) for more info and add a ❤️ to receive future updates.Do you like what I do?\\r\\n Consider supporting me on Patreon 🅿️ to get exclusive tips and tutorials, or feel free to buy me a coffee ☕",
  personality:
    "her body hair due to her homelessness, and her genitals are also smelly and in poor condition. She wears her old military uniform and armor, both worn and torn from use.\\r\\n\\r\\n<Background>\\r\\nBorn as the third child among five siblings in a poor village on the eastern border of the empire, {{char}} enlisted in the imperial army to support her family. Being the only one able to leave home, as her brothers were needed for farming, she initially served as a quartermaster before moving to the frontline infantry to combat separatist elves in the south. ",
  scenario:
    'After nearly a decade of distinguished service, she left the army, \\n having sent most of her earnings to her family, only to find her sacrifices rendered futile as her hometown became a warzone, losing her family and financial support. \\r\\nUpon discharge, she discovered that the \\"Imperial Veteran Affair\\" had suspended pension payments due to wartime economic difficulties. With no opportunities in the adventurers\' guild and an overflow of discharged soldiers, she now faces the grim reality of homelessness in stark contrast to her past life of service, surviving by begging and selling handmade animal drawings and carvings.',
  first_mes: "In the midst of the imperial capital's streets.",
  mes_example: "",
  creatorcomment: "asdasdasdasdsadas",
  avatar: "https://us-west-ddream-pic.s3.us-west-2.amazonaws.com/0/123.png",
  chat: "xinde - 2024-7-15 @16h 08m 45s 428ms",
  fav: true,
  tags: ["girls", "Fantasy", "Female", "Homeless"],
  spec: "chara_card_v2",
  spec_version: "2.0",
  create_date: "2024-7-20 @13h 56m 42s 116ms",
  data_size: 32,
};

export const DEFAULT_DIGITAL_LIFE_AUTHOR: DigitalLifeAuthorType = {
  email: "313732247@qq.com",
  uid: 7858057,
  wallet: "",
  name: "Misty-DDreamer-2585",
  avatar: "https://us-west-ddream-pic.s3.us-west-2.amazonaws.com/0/123.png",
  stars: 3,
  down_load: 0,
  run: 1,
};

export const DEFAULT_DIGITAL_LIFE_CHARACTER_DATA: DigitalLifeCharacterDataType = {
  name: "xinde",
  description: "asdasd",
  personality: "",
  scenario: "",
  first_mes: "asdasd",
  mes_example: "",
  creator_notes: "",
  system_prompt: "",
  post_history_instructions: "",
  tags: [],
  creator: "",
  character_version: "",
  alternate_greetings: [],
  extensions: {
    fav: false,
    world: "",
    depth_prompt: {
      prompt: "",
      depth: 4,
    },
    nuwa_voice: "123",
    nuwa_avatar: {
      version: "1.0",
      type: "LIVE2D",
      url: "https://live2doss.oss-accelerate.aliyuncs.com/adaerbote_2/adaerbote_2.model3.json",
      name: "adaerbote_2",
      clickMotion: {
        groupName: "",
        index: 11,
      },
      startMotion: {
        groupName: "",
        index: 1,
      },
    },
  },
};
