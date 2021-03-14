module.exports = async (callback, scanner) => {
    let index = scanner.req_bundle.index;
    let head_params = scanner.head_params;
    if (index === 'LoadDirect') {
        let query = {so_phimle: Number(head_params.get('sophimle')) , so_phim:  Number(head_params.get('sophim')) }
        let projection = {
            _id: 0, so_phimle: 0, so_phim: 0, url_embed: 0, thoi_gian:0
        }
        let select = await scanner["modelxxemtua.com/danhsachlinkphimle"].dataModel.select(query, projection, {}, 0, 0);
        select = JSON.parse(JSON.stringify(select[0]));

        callback(JSON.stringify(select), 'application/json');
    }
    if (index === 'LoadEmbed') {
        let query = {so_phimle: Number(head_params.get('sophimle')) , so_phim:  Number(head_params.get('sophim')) }
        let projection = {
            _id: 0, so_phimle: 0, so_phim: 0, url_direct: 0, thoi_gian:0
        }
        let select = await scanner["modelxxemtua.com/danhsachlinkphimle"].dataModel.select(query, projection, {}, 0, 0);
        select = JSON.parse(JSON.stringify(select[0]));

        callback(JSON.stringify(select), 'application/json');
    }
}