import { createCatalog } from '@json-render/core';
import { z } from 'zod';

export const waitlistCatalog = createCatalog({
  components: {
    Text: {
      description: '显示文本消息',
      props: z.object({
        content: z.string().describe('要显示的文本内容'),
      }),
      hasChildren: false,
    },
    CheckboxGroup: {
      description: '多选框组，用于让用户选择多个选项',
      props: z.object({
        label: z.string().describe('多选框组的标题'),
        options: z.array(z.object({
          id: z.string().describe('选项的唯一标识'),
          label: z.string().describe('选项显示的文本'),
        })).describe('可选的选项列表'),
      }),
      hasChildren: false,
    },
    Question: {
      description: '询问用户的问题文本',
      props: z.object({
        text: z.string().describe('问题内容'),
      }),
      hasChildren: false,
    },
  },
});

export type WaitlistCatalog = typeof waitlistCatalog;
