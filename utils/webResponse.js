exports.error_res = (res, msg) => {
    res.status(400)
        .json({
            status: 400,
            Error: msg
        })
};

exports.error_render_with_msg = (res, err) => {
    res.status(400)
        .render('pages/error', {
            error: err,
            message: err.message
        })
};

exports.success_render = ( res, functioName, data ) => {
    res.render( 'pages/content' , {
        functioName: functioName,
        layout: 'layouts/detail',
        data: data,
    });
};