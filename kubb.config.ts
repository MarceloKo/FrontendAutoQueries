import { defineConfig } from '@kubb/core'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginReactQuery } from '@kubb/plugin-react-query'


const baseUrl = 'https://petstore.swagger.io/v2'
export default defineConfig({
    root: '.',
    input: {
        path: `${baseUrl}/swagger.json`,
    },
    output: {
        path: './src/api-kubb',
        clean: true,

    },

    plugins: [
        pluginOas({ validate: true }),
        pluginTs({
            output: {
                path: './models'
            }
        }),
        pluginReactQuery({
            output: {
                path: './querys',
            },
            group: {
                type: 'path',
            },
            client: {
                baseURL: baseUrl,
            }
        }),
    ],

})
