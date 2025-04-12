/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/share/route";
exports.ids = ["app/api/share/route"];
exports.modules = {

/***/ "(rsc)/./app/api/share/route.js":
/*!********************************!*\
  !*** ./app/api/share/route.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/@supabase/supabase-js/dist/module/index.js\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\n\n// Verificar variables de entorno\nconsole.log('NEXT_PUBLIC_SUPABASE_URL:', \"https://cteqctxcpondjjigklmf.supabase.co\");\nconsole.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Defined' : 'Not defined');\n// Inicializar el cliente de Supabase\nlet supabase;\ntry {\n    supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_1__.createClient)(\"https://cteqctxcpondjjigklmf.supabase.co\", process.env.SUPABASE_SERVICE_ROLE_KEY);\n    console.log('Cliente de Supabase inicializado correctamente');\n} catch (error) {\n    console.error('Error al inicializar el cliente de Supabase:', error);\n    throw error;\n}\nasync function POST(request) {\n    try {\n        console.log('Recibiendo solicitud en /api/share');\n        const { imageUrl, title, description, url } = await request.json();\n        console.log('Datos recibidos:', {\n            imageUrl,\n            title,\n            description,\n            url\n        });\n        if (!imageUrl || !title || !description || !url) {\n            console.log('Faltan campos requeridos');\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Todos los campos (imagen, título, descripción, URL) son requeridos.'\n            }, {\n                status: 400\n            });\n        }\n        try {\n            new URL(imageUrl);\n            console.log('URL de imagen válida:', imageUrl);\n        } catch  {\n            console.log('URL de imagen no válida:', imageUrl);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'La URL de la imagen no es válida.'\n            }, {\n                status: 400\n            });\n        }\n        const maxTextLength = 1000;\n        if (title.length > maxTextLength || description.length > maxTextLength || url.length > maxTextLength) {\n            console.log('Texto demasiado largo:', {\n                title,\n                description,\n                url\n            });\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'El título, la descripción o la URL son demasiado largos.'\n            }, {\n                status: 400\n            });\n        }\n        console.log('Guardando datos en Supabase...');\n        const { data, error } = await supabase.from('shares').insert([\n            {\n                title,\n                description,\n                url,\n                image_url: imageUrl\n            }\n        ]).select();\n        if (error) {\n            console.error('Error al guardar en Supabase:', error);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Hubo un error al guardar los datos. Por favor, intenta de nuevo.'\n            }, {\n                status: 500\n            });\n        }\n        console.log('Datos guardados en Supabase:', data);\n        const shareId = data[0].id;\n        const shareUrl = `https://${request.headers.get('host')}/share/${shareId}`;\n        console.log('Enlace compartido generado:', shareUrl);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            shareUrl\n        }, {\n            status: 200\n        });\n    } catch (error) {\n        console.error('Error en la API /api/share:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Hubo un error al procesar la solicitud. Por favor, intenta de nuevo.'\n        }, {\n            status: 500\n        });\n    }\n}\nasync function GET(request) {\n    try {\n        const { searchParams } = new URL(request.url);\n        const id = searchParams.get('id');\n        if (!id) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Falta el ID del enlace compartido.'\n            }, {\n                status: 400\n            });\n        }\n        const { data, error } = await supabase.from('shares').select('*').eq('id', id).single();\n        if (error) {\n            console.error('Error al recuperar datos de Supabase:', error);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Hubo un error al recuperar los datos. Por favor, intenta de nuevo.'\n            }, {\n                status: 500\n            });\n        }\n        if (!data) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Enlace compartido no encontrado.'\n            }, {\n                status: 404\n            });\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(data, {\n            status: 200\n        });\n    } catch (error) {\n        console.error('Error en la API /api/share GET:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Hubo un error al procesar la solicitud. Por favor, intenta de nuevo.'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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XFxyb3V0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDbGllbnQgfSBmcm9tICdAc3VwYWJhc2Uvc3VwYWJhc2UtanMnO1xuaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xuXG4vLyBWZXJpZmljYXIgdmFyaWFibGVzIGRlIGVudG9ybm9cbmNvbnNvbGUubG9nKCdORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkw6JywgcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMKTtcbmNvbnNvbGUubG9nKCdTVVBBQkFTRV9TRVJWSUNFX1JPTEVfS0VZOicsIHByb2Nlc3MuZW52LlNVUEFCQVNFX1NFUlZJQ0VfUk9MRV9LRVkgPyAnRGVmaW5lZCcgOiAnTm90IGRlZmluZWQnKTtcblxuLy8gSW5pY2lhbGl6YXIgZWwgY2xpZW50ZSBkZSBTdXBhYmFzZVxubGV0IHN1cGFiYXNlO1xudHJ5IHtcbiAgc3VwYWJhc2UgPSBjcmVhdGVDbGllbnQoXG4gICAgcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMLFxuICAgIHByb2Nlc3MuZW52LlNVUEFCQVNFX1NFUlZJQ0VfUk9MRV9LRVlcbiAgKTtcbiAgY29uc29sZS5sb2coJ0NsaWVudGUgZGUgU3VwYWJhc2UgaW5pY2lhbGl6YWRvIGNvcnJlY3RhbWVudGUnKTtcbn0gY2F0Y2ggKGVycm9yKSB7XG4gIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGFsIGluaWNpYWxpemFyIGVsIGNsaWVudGUgZGUgU3VwYWJhc2U6JywgZXJyb3IpO1xuICB0aHJvdyBlcnJvcjtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdCkge1xuICB0cnkge1xuICAgIGNvbnNvbGUubG9nKCdSZWNpYmllbmRvIHNvbGljaXR1ZCBlbiAvYXBpL3NoYXJlJyk7XG5cbiAgICBjb25zdCB7IGltYWdlVXJsLCB0aXRsZSwgZGVzY3JpcHRpb24sIHVybCB9ID0gYXdhaXQgcmVxdWVzdC5qc29uKCk7XG4gICAgY29uc29sZS5sb2coJ0RhdG9zIHJlY2liaWRvczonLCB7IGltYWdlVXJsLCB0aXRsZSwgZGVzY3JpcHRpb24sIHVybCB9KTtcblxuICAgIGlmICghaW1hZ2VVcmwgfHwgIXRpdGxlIHx8ICFkZXNjcmlwdGlvbiB8fCAhdXJsKSB7XG4gICAgICBjb25zb2xlLmxvZygnRmFsdGFuIGNhbXBvcyByZXF1ZXJpZG9zJyk7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHsgZXJyb3I6ICdUb2RvcyBsb3MgY2FtcG9zIChpbWFnZW4sIHTDrXR1bG8sIGRlc2NyaXBjacOzbiwgVVJMKSBzb24gcmVxdWVyaWRvcy4nIH0sXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgbmV3IFVSTChpbWFnZVVybCk7XG4gICAgICBjb25zb2xlLmxvZygnVVJMIGRlIGltYWdlbiB2w6FsaWRhOicsIGltYWdlVXJsKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIGNvbnNvbGUubG9nKCdVUkwgZGUgaW1hZ2VuIG5vIHbDoWxpZGE6JywgaW1hZ2VVcmwpO1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IGVycm9yOiAnTGEgVVJMIGRlIGxhIGltYWdlbiBubyBlcyB2w6FsaWRhLicgfSxcbiAgICAgICAgeyBzdGF0dXM6IDQwMCB9XG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IG1heFRleHRMZW5ndGggPSAxMDAwO1xuICAgIGlmIChcbiAgICAgIHRpdGxlLmxlbmd0aCA+IG1heFRleHRMZW5ndGggfHxcbiAgICAgIGRlc2NyaXB0aW9uLmxlbmd0aCA+IG1heFRleHRMZW5ndGggfHxcbiAgICAgIHVybC5sZW5ndGggPiBtYXhUZXh0TGVuZ3RoXG4gICAgKSB7XG4gICAgICBjb25zb2xlLmxvZygnVGV4dG8gZGVtYXNpYWRvIGxhcmdvOicsIHsgdGl0bGUsIGRlc2NyaXB0aW9uLCB1cmwgfSk7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHsgZXJyb3I6ICdFbCB0w610dWxvLCBsYSBkZXNjcmlwY2nDs24gbyBsYSBVUkwgc29uIGRlbWFzaWFkbyBsYXJnb3MuJyB9LFxuICAgICAgICB7IHN0YXR1czogNDAwIH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coJ0d1YXJkYW5kbyBkYXRvcyBlbiBTdXBhYmFzZS4uLicpO1xuICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbSgnc2hhcmVzJylcbiAgICAgIC5pbnNlcnQoW3sgdGl0bGUsIGRlc2NyaXB0aW9uLCB1cmwsIGltYWdlX3VybDogaW1hZ2VVcmwgfV0pXG4gICAgICAuc2VsZWN0KCk7XG5cbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGFsIGd1YXJkYXIgZW4gU3VwYWJhc2U6JywgZXJyb3IpO1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IGVycm9yOiAnSHVibyB1biBlcnJvciBhbCBndWFyZGFyIGxvcyBkYXRvcy4gUG9yIGZhdm9yLCBpbnRlbnRhIGRlIG51ZXZvLicgfSxcbiAgICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKCdEYXRvcyBndWFyZGFkb3MgZW4gU3VwYWJhc2U6JywgZGF0YSk7XG5cbiAgICBjb25zdCBzaGFyZUlkID0gZGF0YVswXS5pZDtcbiAgICBjb25zdCBzaGFyZVVybCA9IGBodHRwczovLyR7cmVxdWVzdC5oZWFkZXJzLmdldCgnaG9zdCcpfS9zaGFyZS8ke3NoYXJlSWR9YDtcbiAgICBjb25zb2xlLmxvZygnRW5sYWNlIGNvbXBhcnRpZG8gZ2VuZXJhZG86Jywgc2hhcmVVcmwpO1xuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc2hhcmVVcmwgfSwgeyBzdGF0dXM6IDIwMCB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBlbiBsYSBBUEkgL2FwaS9zaGFyZTonLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBlcnJvcjogJ0h1Ym8gdW4gZXJyb3IgYWwgcHJvY2VzYXIgbGEgc29saWNpdHVkLiBQb3IgZmF2b3IsIGludGVudGEgZGUgbnVldm8uJyB9LFxuICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IHNlYXJjaFBhcmFtcyB9ID0gbmV3IFVSTChyZXF1ZXN0LnVybCk7XG4gICAgY29uc3QgaWQgPSBzZWFyY2hQYXJhbXMuZ2V0KCdpZCcpO1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnRmFsdGEgZWwgSUQgZGVsIGVubGFjZSBjb21wYXJ0aWRvLicgfSwgeyBzdGF0dXM6IDQwMCB9KTtcbiAgICB9XG5cbiAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oJ3NoYXJlcycpXG4gICAgICAuc2VsZWN0KCcqJylcbiAgICAgIC5lcSgnaWQnLCBpZClcbiAgICAgIC5zaW5nbGUoKTtcblxuICAgIGlmIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgYWwgcmVjdXBlcmFyIGRhdG9zIGRlIFN1cGFiYXNlOicsIGVycm9yKTtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBlcnJvcjogJ0h1Ym8gdW4gZXJyb3IgYWwgcmVjdXBlcmFyIGxvcyBkYXRvcy4gUG9yIGZhdm9yLCBpbnRlbnRhIGRlIG51ZXZvLicgfSxcbiAgICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICghZGF0YSkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdFbmxhY2UgY29tcGFydGlkbyBubyBlbmNvbnRyYWRvLicgfSwgeyBzdGF0dXM6IDQwNCB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oZGF0YSwgeyBzdGF0dXM6IDIwMCB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBlbiBsYSBBUEkgL2FwaS9zaGFyZSBHRVQ6JywgZXJyb3IpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgIHsgZXJyb3I6ICdIdWJvIHVuIGVycm9yIGFsIHByb2Nlc2FyIGxhIHNvbGljaXR1ZC4gUG9yIGZhdm9yLCBpbnRlbnRhIGRlIG51ZXZvLicgfSxcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgICk7XG4gIH1cbn0iXSwibmFtZXMiOlsiY3JlYXRlQ2xpZW50IiwiTmV4dFJlc3BvbnNlIiwiY29uc29sZSIsImxvZyIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwiLCJTVVBBQkFTRV9TRVJWSUNFX1JPTEVfS0VZIiwic3VwYWJhc2UiLCJlcnJvciIsIlBPU1QiLCJyZXF1ZXN0IiwiaW1hZ2VVcmwiLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwidXJsIiwianNvbiIsInN0YXR1cyIsIlVSTCIsIm1heFRleHRMZW5ndGgiLCJsZW5ndGgiLCJkYXRhIiwiZnJvbSIsImluc2VydCIsImltYWdlX3VybCIsInNlbGVjdCIsInNoYXJlSWQiLCJpZCIsInNoYXJlVXJsIiwiaGVhZGVycyIsImdldCIsIkdFVCIsInNlYXJjaFBhcmFtcyIsImVxIiwic2luZ2xlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/share/route.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fshare%2Froute&page=%2Fapi%2Fshare%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fshare%2Froute.js&appDir=C%3A%5CProyectos%5Celectron-social-share-next%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CProyectos%5Celectron-social-share-next&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fshare%2Froute&page=%2Fapi%2Fshare%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fshare%2Froute.js&appDir=C%3A%5CProyectos%5Celectron-social-share-next%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CProyectos%5Celectron-social-share-next&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Proyectos_electron_social_share_next_app_api_share_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/share/route.js */ \"(rsc)/./app/api/share/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/share/route\",\n        pathname: \"/api/share\",\n        filename: \"route\",\n        bundlePath: \"app/api/share/route\"\n    },\n    resolvedPagePath: \"C:\\\\Proyectos\\\\electron-social-share-next\\\\app\\\\api\\\\share\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Proyectos_electron_social_share_next_app_api_share_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZzaGFyZSUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGc2hhcmUlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZzaGFyZSUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDUHJveWVjdG9zJTVDZWxlY3Ryb24tc29jaWFsLXNoYXJlLW5leHQlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNQcm95ZWN0b3MlNUNlbGVjdHJvbi1zb2NpYWwtc2hhcmUtbmV4dCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDb0I7QUFDakc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFByb3llY3Rvc1xcXFxlbGVjdHJvbi1zb2NpYWwtc2hhcmUtbmV4dFxcXFxhcHBcXFxcYXBpXFxcXHNoYXJlXFxcXHJvdXRlLmpzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9zaGFyZS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3NoYXJlXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9zaGFyZS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFByb3llY3Rvc1xcXFxlbGVjdHJvbi1zb2NpYWwtc2hhcmUtbmV4dFxcXFxhcHBcXFxcYXBpXFxcXHNoYXJlXFxcXHJvdXRlLmpzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fshare%2Froute&page=%2Fapi%2Fshare%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fshare%2Froute.js&appDir=C%3A%5CProyectos%5Celectron-social-share-next%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CProyectos%5Celectron-social-share-next&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("punycode");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@supabase","vendor-chunks/whatwg-url","vendor-chunks/tr46","vendor-chunks/webidl-conversions"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fshare%2Froute&page=%2Fapi%2Fshare%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fshare%2Froute.js&appDir=C%3A%5CProyectos%5Celectron-social-share-next%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CProyectos%5Celectron-social-share-next&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();