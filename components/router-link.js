export default {
    // this是当前组件
    name:'router-link',
    functional: true,
    props:{
        to:{
            type:String,
            required:true
        },
        tag:{
            type:String
        }
    },
    render(h,context){
        let tag = context.props.tag || 'a'
        const clickHandler = ()=>{
            context.parent.$router.push(context.props.to)
            // console.log(context.parent.$route)
        }
        return h(tag,{
            on:{
                click:clickHandler
            }
        },context.slots().default)
    }
}