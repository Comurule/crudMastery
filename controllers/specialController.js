const models = require('../models');
const { error_render_with_msg, error_res, success_render } = require('../utils/webResponse');

//Get all Posts by Department name
exports.getAllPostsByDept = async(req, res) => {
    try {
        const department = await models.Department.findOne({ 
            where: { department_name: req.params.department_name }
        });
        //If Such Department doesn't exist
        if(!department){ 
            error_res(  res, `${req.params.department_name} does not exist in the database.`  )
        }
        const posts = await models.Post.findAll({
            where: { DepartmentId: department.id }
        });

        //Success Response
        success_render( res, 
            'POST DEPT',  
            { 
                department, 
                posts 
            }
        );

    } catch (e) {
        error_render_with_msg(res, e);
    }
};

//Get all Posts by username
exports.getAllPostsByUsername = async(req, res) => {
    try {
        const user = await models.User.findOne({ 
            where: { username: req.params.username },
            include: {
                model: models.Post,
                attributes: [ 'id', 'post_title', 'post_body' ]
            }
        });
        //If Such User doesn't exist
        if(!user){ 
            error_res(  res, `${req.params.username} does not exist in the database.`  )
        }
        //Success Response
        success_render( 
            res, 
            'POST USER', 
            { 
                user, 
                posts: user.Posts 
            } 
        );

    } catch (e) {
        error_render_with_msg(res, e);
    }
};

//Get all Posts by username and department name
exports.getAllPostsByUsernameByDept = async(req, res) => {
    try {
        const department = await models.Department.findOne({
            where: { department_name: req.params.department_name }
        });

        //If Such Department doesn't exist
        if(!department){ 
            error_res(  res, `${req.params.department_name} does not exist in the database.`  )
        }else{
            const user = await models.User.findOne({
                where: { 
                    username: req.params.username, 
                    DepartmentId: department.id 
                },
                include: { 
                    model: models.Post, 
                    attributes: [ 'id', 'post_title', 'post_body' ]
                }
            });
            //If Such User doesn't exist
            if(!user){ 
                error_res(  res, `${req.params.username} in 
                    ${req.params.department_name} department does not exist in the database.`  )
            }

            //Success Response
            success_render( res, 
                'POST USER DEPT', 
                { 
                    user, 
                    department, 
                    posts: user.Posts 
                }
            );
        }        
    } catch (e) {
        error_render_with_msg(res, e);
    }
};

//Get all Users by role
exports.getAllUsersByRole = async(req, res) => {
    try {
        const role = await models.Role.findOne({ 
            where: { role_name: req.params.role_name } 
        });

        //If Such Role doesn't exist
        if(!role){ 
            error_res(  res, `${req.params.role_name} does not exist in the database.`  )
        } else {
            const users = await models.User.findAll({
                where: { 
                    RoleId: role.id
                }
            });
            //If Such User doesn't exist
            if(!users){ 
                error_res(  
                    res, 
                    `There are no Users as ${req.params.role_name} in the database.`  
                );
            }
             //Success Response
             success_render( res, 
                'USER ROLE', 
                { 
                    users, 
                    role,
                }
            );
        }


    } catch (e) {
        error_render_with_msg(res, e);
    }
};

//Get al Users by Profile
exports.getAllUsersByProfile = async(req, res) => {
    try {
        const profile = await models.Profile.findOne({ 
            where: { profile_name: req.params.profile_name } 
        });

        //If Such Profile doesn't exist
        if(!profile){ 
            error_res(  res, `${req.params.profile_name} does not exist in the database.`  )
        } else {
            const users = await models.User.findAll({
                where: { 
                    ProfileId: profile.id
                }
            });
            //If Such User doesn't exist
            if(!users){ 
                error_res(  
                    res, 
                    `There are no Users as ${req.params.profile_name} in the database.`  
                );
            }
             //Success Response
             success_render( res, 
                'USER PROFILE', 
                { 
                    users, 
                    profile,
                }
            );
        }
    } catch (e) {
        error_render_with_msg(res, e);
    }
};

//Get all Posts by category name
exports.getAllPostsByCategory = async(req, res) => {
    try {
        const category = await models.Category.findOne({ 
            where: { category_name: req.params.category_name } 
        });

        //If Such Role doesn't exist
        if(!category){ 
            error_res(  res, `${req.params.category_name} does not exist in the database.`  )
        } else {
            const post_bulk = await models.Post.findAll({
                include: { 
                    model: models.Category,
                    as: 'categories',
                    through: 'PostCategories',
                    attributes: [ 'id', 'category_name' ]
                }
            });
            let posts = [];
            console.log(typeof(post_bulk));
            post_bulk.forEach(post => {
                post.categories.forEach((category) => {
                    if(category.category_name == req.params.category_name){
                        console.log(post.id, post.post_title)
                        posts.push(post);
                    }
                })
            });

            //If Such User doesn't exist
            if(!posts){ 
                error_res(  
                    res, 
                    `There are no Posts in ${req.params.category_name} in the database.`  
                );
            }
            
             //Success Response
             success_render( res, 
                'POST CATE', 
                { 
                    posts, 
                    category,
                }
            );
        }
    } catch (e) {
        error_render_with_msg(res, e);
    }
};

//Get all Posts by a User in a Current Business
exports.getAllPostsByUserInCurrentBusiness = async(req, res) => {
    try {
        const business = await models.CurrentBusiness.findOne({
            where: { current_business_name: req.params.current_business_name }
        });

        //If Such Current Business doesn't exist
        if(!business){ 
            error_res(  res, `${req.params.current_business_name} does not exist in the database.`  )
        }else{
            const user = await models.User.findOne({
                where: { 
                    username: req.params.username, 
                    CurrentBusinessId: business.id 
                },
                include: { 
                    model: models.Post, 
                    attributes: [ 'id', 'post_title', 'post_body' ]
                }
            });
            //If Such User doesn't exist
            if(!user){ 
                error_res(  res, `${req.params.username} in 
                    ${req.params.current_business_name} does not exist in the database.`  )
            }

            //Success Response
            success_render( res, 
                'POST USER BUSINESS', 
                { 
                    user, 
                    business, 
                    posts: user.Posts 
                }
            );
        }        

    } catch (e) {
        error_render_with_msg(res, e);
    }
};

//Get all Posts by a User in Engineering department in Business Company 123
exports.getAllPostsByUserInCurrentBusinessInDept = async(req, res) => {
    try {
        const department = await models.Department.findOne({
            where: { department_name: req.params.department_name }
        });

        const business = await models.CurrentBusiness.findOne({
            where: { current_business_name: req.params.current_business_name }
        });

        //If Such Current Business OR Department doesn't exist
        if( !business || !department ){ 
            error_res(  res, `${req.params.current_business_name} or 
                ${req.params.department_name} does not exist in the database.`  )
        }else{
            const user = await models.User.findOne({
                where: { 
                    username: req.params.username, 
                    CurrentBusinessId: business.id,
                    DepartmentId: department.id
                },
                include: { 
                    model: models.Post, 
                    attributes: [ 'id', 'post_title', 'post_body' ]
                }
            });
            //If Such User doesn't exist
            if(!user){ 
                error_res(  res, `${req.params.username} in 
                    ${req.params.current_business_name} and 
                    ${req.params.department_name} department does not exist in the database.`  
                )
            }

            //Success Response
            success_render( res, 
                'POST USER BUSINESS DEPT', 
                { 
                    user, 
                    business, 
                    department,
                    posts: user.Posts 
                }
            );
        }        
    } catch (e) {
        error_render_with_msg(res, e);
    }
};

//Get all Posts for a current business Company ABC
exports.getAllPostsForCurrentBusiness = async(req, res) => {
    try {
        const business = await models.CurrentBusiness.findOne({ 
            where: { 
                current_business_name: req.params.current_business_name 
            }
        });
        //If Such Business doesn't exist
        if(!business){ 
            error_res(  res, `${req.params.current_business_name} does not exist in the database.`  )
        }
        const posts = await models.Post.findAll({
            where: { CurrentBusinessId: business.id }
        });

        //Success Response
        success_render( res, 
            'POST BUSINESS',  
            { 
                business, 
                posts 
            }
        );
    } catch (e) {
        error_render_with_msg(res, e);
    }
};

//Get all Posts by a User in Role=Manager, Department =Engineering
exports.getAllPostsByUserInDeptInRole = async(req, res) => {
    try {
        const department = await models.Department.findOne({
            where: { department_name: req.params.department_name }
        });

        const role = await models.Role.findOne({
            where: { role_name: req.params.role_name }
        });

        //If Such  Role or Department doesn't exist
        if( !role || !department ){ 
            error_res(  res, `${req.params.role_name} or 
                ${req.params.department_name} does not exist in the database.`  )
        }else{
            const user = await models.User.findOne({
                where: { 
                    username: req.params.username, 
                    RoleId: role.id,
                    DepartmentId: department.id
                },
                include: { 
                    model: models.Post, 
                    attributes: [ 'id', 'post_title', 'post_body' ]
                }
            });
            //If Such User doesn't exist
            if(!user){ 
                error_res(  res, `${req.params.username} as 
                    ${req.params.role_name} in 
                    ${req.params.department_name} department does not exist in the database.`  
                )
            }

            //Success Response
            success_render( res, 
                'POST USER ROLE DEPT', 
                { 
                    user, 
                    role, 
                    department,
                    posts: user.Posts 
                }
            );
        }        
    } catch (e) {
        error_render_with_msg(res, e);
    }
};

//Profile= Administreator, Current Business = Company ABC
exports.getAllPostsByUserInCurrentBusinessInDeptInRoleInProfile = async(req, res) => {
    try {
        const business = await models.CurrentBusiness.findOne({
            where: { current_business_name: req.params.current_business_name }
        });
        const profile = await models.Profile.findOne({
            where: { profile_name: req.params.profile_name }
        });
        const department = await models.Department.findOne({
            where: { department_name: req.params.department_name }
        });

        const role = await models.Role.findOne({
            where: { role_name: req.params.role_name }
        });

        //If Such accounts don't exist
        if( !role || !department || !business || !profile ){ 
            error_res(  res, `${req.params.role_name} or 
                ${req.params.department_name} or ${req.params.current_business_name}
                or ${req.params.profile_name} does not exist in the database.`  )
        }else{
            const user = await models.User.findOne({
                where: { 
                    username: req.params.username, 
                    RoleId: role.id,
                    DepartmentId: department.id,
                    ProfileId: profile.id,
                    CurrentBusinessId: business.id
                },
                include: { 
                    model: models.Post, 
                    attributes: [ 'id', 'post_title', 'post_body' ]
                }
            });
            //If Such User doesn't exist
            if(!user){ 
                error_res(  res, `${req.params.username} as 
                    ${req.params.role_name} and ${req.params.profile_name} in 
                    ${req.params.department_name} in ${req.params.current_business_name} 
                     does not exist in the database.`  
                )
            }

            //Success Response
            success_render( res, 
                'POST USER ALL', 
                { 
                    user, 
                    role, 
                    department,
                    business,
                    profile,
                    posts: user.Posts 
                }
            );
            console.log(user.Posts)
        }        
    } catch (e) {
        error_render_with_msg(res, e);
    }
};