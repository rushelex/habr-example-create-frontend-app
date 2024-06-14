import inquirer from 'inquirer';

import { type Arguments } from '~/core/arguments/types';

import { namespaceQuestion } from './namespace';
import { type Answers } from './types';

interface GetAnswersConfig {
  args: Arguments;
}

export async function getAnswers(config: GetAnswersConfig): Promise<Answers> {
  const { args } = config;

  let answers = {};
  const questions = [];

  if (!args.namespace) {
    questions.push(namespaceQuestion);
  }

  answers = await inquirer.prompt<Answers>(questions);

  return {
    namespace: args.namespace,
    ...answers,
  };
}
