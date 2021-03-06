/**
 * @swagger
 * tags:
 *  name: chat
 *  description: chat's tag 
 * /main:
 *  get:
 *      description: 
 *          Go to the chat room on the websocket server on 8080 port.
 *      tags: [chat]
 *      responses:
 *        '200':
 *          description: Get site with chat and then upgrade channel there.
 *        '404':
 *          description: Main site file was not found.
 * /api:
 *  get:
 *      description: Go to the site with API's description.
 *      tags: [chat]
 *      responses:
 *        '200':
 *          description: Get html that was generated by swaggerUI.
 *        '404':
 *          description: File was not found.
 * /doc:
 *  get:
 *      description: Go to the chat documentation.
 *      tags: [chat]
 *      responses:
 *          '200':
 *            description: Get html that was generated by jsdoc.
 *          '404':
 *            description: File was not found.
 */
