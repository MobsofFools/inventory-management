import {useRouter} from 'next/router'

const Item = () => {
    const router = useRouter()
    const {id} = router.query
    return(
        <div>
            <p>Item: {id}</p>
        </div>
    )
}
export default Item