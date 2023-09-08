import styled from 'styled-components'

const Container = styled.div`
    .mul13 {
        width: 36px;
        height: 36px;
        position: relative;
    }

    .m13s {
        height: 36px;
        width: 36px;
        border-radius: 50%;
        position: absolute;
        opacity: 0.75;
    }

    .m13c1 {
        background-color: #00405f;
        -webkit-animation: m13s1anim 3s infinite linear;
        animation: m13s1anim 3s infinite linear;
    }

    .m13c2 {
        background-color: #ffd700;
        -webkit-animation: m13s2anim 3s infinite linear;
        animation: m13s2anim 3s infinite linear;
    }

    @-webkit-keyframes m13s1anim {
        0%,
        100% {
            -webkit-transform: translateX(-15px);
            transform: translateX(-15px);
        }
        25% {
            -webkit-transform: scale(0.6);
            transform: scale(0.6);
            opacity: 0.25;
        }
        50% {
            -webkit-transform: translateX(15px);
            transform: translateX(15px);
        }
        75% {
            -webkit-transform: scale(1.4);
            transform: scale(1.4);
            opacity: 0.8;
        }
    }

    @keyframes m13s1anim {
        0%,
        100% {
            -webkit-transform: translateX(-15px);
            transform: translateX(-15px);
        }
        25% {
            -webkit-transform: scale(0.6);
            transform: scale(0.6);
            opacity: 0.25;
        }
        50% {
            -webkit-transform: translateX(15px);
            transform: translateX(15px);
        }
        75% {
            -webkit-transform: scale(1.4);
            transform: scale(1.4);
            opacity: 0.8;
        }
    }

    @-webkit-keyframes m13s2anim {
        0%,
        100% {
            -webkit-transform: translateX(15px);
            transform: translateX(15px);
        }
        25% {
            -webkit-transform: scale(1.4);
            transform: scale(1.4);
            opacity: 0.8;
        }
        50% {
            -webkit-transform: translateX(-15px);
            transform: translateX(-15px);
        }
        75% {
            -webkit-transform: scale(0.6);
            transform: scale(0.6);
            opacity: 0.25;
        }
    }

    @keyframes m13s2anim {
        0%,
        100% {
            -webkit-transform: translateX(15px);
            transform: translateX(15px);
        }
        25% {
            -webkit-transform: scale(1.4);
            transform: scale(1.4);
            opacity: 0.8;
        }
        50% {
            -webkit-transform: translateX(-15px);
            transform: translateX(-15px);
        }
        75% {
            -webkit-transform: scale(0.6);
            transform: scale(0.6);
            opacity: 0.25;
        }
    }
`

interface Props {}

export const LoadingSpinner = ({}: Props) => {
    return (
        <Container>
            <div className="mul13">
                <div className="m13s m13c1"></div>
                <div className="m13s m13c2"></div>
            </div>
        </Container>
    )
}
