import { ColorDefinition, ColorMode, ColorProfile } from '../types/printer';

export function getColors(mode: ColorMode, profile: ColorProfile): ColorDefinition[] {
  const isPure = profile === 'pure-driver';

  const baseColors: ColorDefinition[] = [
    {
      name: '青色 (Cyan)',
      code: 'C',
      rgb: isPure ? 'rgb(0, 255, 255)' : 'rgb(0, 160, 233)',
      hex: isPure ? '#00FFFF' : '#00A0E9',
      cmykLabel: 'C: 100% M: 0% Y: 0% K: 0%',
      description: '激发青色喷孔，检测冷色与纯蓝纯绿混色基石',
    },
    {
      name: '洋红 (Magenta)',
      code: 'M',
      rgb: isPure ? 'rgb(255, 0, 255)' : 'rgb(228, 0, 127)',
      hex: isPure ? '#FF00FF' : '#E4007F',
      cmykLabel: 'C: 0% M: 100% Y: 0% K: 0%',
      description: '激发洋红色喷孔，检测红色与肤色还原度',
    },
    {
      name: '黄色 (Yellow)',
      code: 'Y',
      rgb: isPure ? 'rgb(255, 255, 0)' : 'rgb(255, 230, 0)',
      hex: isPure ? '#FFFF00' : '#FFE600',
      cmykLabel: 'C: 0% M: 0% Y: 100% K: 0%',
      description: '激发黄色喷孔，肉眼最不易察觉断线，需重点对光检查',
    },
    {
      name: '黑色 (Black/Key)',
      code: 'K',
      rgb: 'rgb(0, 0, 0)',
      hex: '#000000',
      cmykLabel: 'C: 0% M: 0% Y: 0% K: 100%',
      description: '激发黑色纯墨孔，日常文本与深部对比的核心',
    },
  ];

  if (mode === 'cmyk-photo') {
    const photoColors: ColorDefinition[] = [
      {
        name: '浅青 (Light Cyan)',
        code: 'LC',
        rgb: isPure ? 'rgb(128, 255, 255)' : 'rgb(120, 213, 248)',
        hex: isPure ? '#80FFFF' : '#78D5F8',
        cmykLabel: 'LC: 100% (Photo Cyan Channel)',
        description: '照片机高光青色喷嘴，确保天空与浅色过渡细腻无颗粒',
      },
      {
        name: '浅洋红 (Light Magenta)',
        code: 'LM',
        rgb: isPure ? 'rgb(255, 153, 238)' : 'rgb(243, 137, 192)',
        hex: isPure ? '#FF99EE' : '#F389C0',
        cmykLabel: 'LM: 100% (Photo Magenta Channel)',
        description: '照片机浅洋红喷嘴，人像面部浅色柔和过渡专孔',
      },
    ];
    // Return C, LC, M, LM, Y, K in standard nozzle order
    return [baseColors[0], photoColors[0], baseColors[1], photoColors[1], baseColors[2], baseColors[3]];
  }

  return baseColors;
}

export const COMPOSITE_COLORS = [
  { name: '红 (Red / M+Y)', hex: '#FF0000', label: 'M+Y 混色' },
  { name: '绿 (Green / C+Y)', hex: '#00FF00', label: 'C+Y 混色' },
  { name: '蓝 (Blue / C+M)', hex: '#0000FF', label: 'C+M 混色' },
  { name: '四色全黑 (Rich Black)', hex: '#000000', label: 'C+M+Y+K 复合' },
];

export const GRADIENT_STEPS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
