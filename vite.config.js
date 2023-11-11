import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/sass/app.scss',
                'resources/js/app.js',
                'resourses/images/resourses/images/favicon-32x32-1.png',
            ],
            refresh: true,
            manifets: {
                icons: [
                    {
                        src: './resourses/images/resourses/images/favicon-32x32-1.png',
                        sizes: '32x32',
                        type: 'image/png',
                    }
                ]
            }
        }),
        react(),
    ],
});
