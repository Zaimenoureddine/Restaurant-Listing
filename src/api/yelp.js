import axios from "axios";

export default axios.create({
    baseURL :'https://api.yelp.com/v3/businesses',
    headers :{
        Authorization : 
              'Bearer CJzEJwh1MB2_zmWH467TKTpORySmj6IYltiXSIuMNjUkCV06sazW4Vkn3Uu-dV2y09ClUDLU-u1rbcytEt8CuXYGpaEQ_rOMBtwiGA_UAmpu7_kIAAdZsRK_cm2bXnYx'
    }
});
