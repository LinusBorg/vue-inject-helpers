const isProd = process.env.NODE_ENV === 'production'
module.exports = {
  presets: [
    !isProd
      ? '@vue/app'
      : [
          '@babel/env',
          {
            modules: 'commonjs',
            targets: '> 1%, not dead, not IE <=8',
            useBuiltIns: false,
          },
        ],
  ],
  plugins: isProd
    ? [
        [
          '@babel/plugin-transform-runtime',
          {
            polyfill: false,
            helpers: false,
            regenerator: false,
          },
        ],
      ]
    : undefined,
}
