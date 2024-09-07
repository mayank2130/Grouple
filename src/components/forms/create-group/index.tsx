import { StripeElements } from "@/components/global/stripe/elements"
import PaymentForm from "./payment-form"

type Props = {
    userId: string
    affiliate: boolean
    stripeId?: string
}

const CreatGroup = ({ userId, affiliate, stripeId }: Props) => {
    return (
        <StripeElements>
            <PaymentForm
                userId={userId}
                affiliate={affiliate}
                stripeId={stripeId}
            />
        </StripeElements>
    )
}

export default CreatGroup
