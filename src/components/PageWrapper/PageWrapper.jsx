import "./PageWrapper.scss";

function PageWrapper({ title, children, rightSlot }) {
return (
    <section className="page">
    <header className="page__header">
        <h1 className="page__title">{title}</h1>
        {rightSlot ? <div className="page__right">{rightSlot}</div> : null}
    </header>

    <div className="page__body">{children}</div>
    </section>
);
}

export default PageWrapper;