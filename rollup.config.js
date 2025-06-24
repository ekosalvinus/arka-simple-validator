import typescript from '@rollup/plugin-typescript';

// Comment out missing plugins to avoid errors
// import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    {
      file: 'dist/index.esm.js',
      format: 'es',
      exports: 'named',
      sourcemap: true
    }
  ],
  plugins: [
    // Removed missing plugins
    // resolve(),
    // commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist',
      include: ['src/**/*'],
      inlineSources: true,
      module: 'esnext',           // Updated module option
      target: 'es2015',           // Set target to ES2015 for better compatibility
      moduleResolution: 'node',   // Added module resolution
      sourceMap: true,
      strict: true
    })
  ],
  external: []
};