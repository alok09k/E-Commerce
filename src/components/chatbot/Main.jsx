import React, { useContext } from 'react';
import { context } from '../../context/data/Context';

function Main() {
    const { onSent, recentPrompt, showResult, loading, resultData, input, setInput } = useContext(context);

    return (
        <div className='main'>
            <div className='main-container'>
                {!showResult ?
                    <>
                        <div className="greet">
                            <p><span>Hello, Bro</span></p>
                            <p>How Can I Help You Today?</p>
                        </div>
                    </>
                    :
                    <div className='result'>
                        <div className='result-title'>
                            <img className='user-image' src={assets.user_icon} alt="User Icon" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className='result-data'>
                            <img src={assets.gemini_icon} alt="Gemini Icon" />
                            {loading ? (
                                <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            ) : (
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            )}
                        </div>
                    </div>
                }

                <div className='main-bottom'>
                    <div className='search-box'>
                        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter a Prompt here' />
                        <div>
                            <img src={assets.gallery_icon} alt="Gallery Icon" />
                            <img src={assets.mic_icon} alt="Mic Icon" />
                            {
                                input ? <img onClick={() => onSent()} src={assets.send_icon} alt="Send Icon" /> : <></>
                            }
                            
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Main;