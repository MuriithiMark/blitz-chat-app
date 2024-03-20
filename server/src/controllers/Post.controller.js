import prisma from "../prisma.js";

/**
 * @type {import("../type-definitions.d").ExpressFunction}
 */
const createPost = async (req, res, next) => {
    const newPost = req.body
    try {
        const post = await prisma.post.create({
            data: newPost
        });
        res.status(200).send({status: "success", post}).end();
    } catch (error) {
        console.error(error);
        res.status(500).send({status: 'fail', message: error.message}).end()
    }
}

/**
 * @type {import("../type-definitions.d").ExpressFunction}
 */
const deletePost = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        if(!postId) {
            return res.status(400).send({status: 'fail', message: 'invalid post id'})
        }
        const post = await prisma.post.delete({
            where: {
                id: postId
            }
        });
        res.status(200).send({status: 'success', message: 'post deleted'}).end()
    } catch (error) {
        console.error(error);
        res.status(500).send({status: 'fail', message: error.message}).end()
    }
}


/**
 * @type {import("../type-definitions.d").ExpressFunction}
 */
const getAllPosts = async (req, res, next) => {
    try {
        const posts = await prisma.post.findMany();
        res.status(200).send({status: 'success', posts}).end()
    } catch (error) {
        console.error(error);
        res.status(500).send({status: 'fail', message: error.message}).end()        
    }
}
const PostController = {
    createPost,
    deletePost,
    getAllPosts,
}

export default PostController;