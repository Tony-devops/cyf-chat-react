function LatestMessages(props) {
    return (
        <div>
            {props.latestMessages.length > 0 && 
            props.latestMessages.map((x)=>(
                <section key={x.id}>
                <span>{x.timeSent}</span>
                <span> {x.from} commented: </span>
                <span> {x.text} </span>

                </section>
            ))}
        </div>
    );
}
export default LatestMessages;