import {PropsWithChildren} from "react";
import {Layout, theme} from "antd";
import {Heading} from "@widgets/heading";
import {Link} from "react-router-dom";
import {AppNotification} from "@app/app-notification";

const {Content, Footer} = Layout;

export const AppLayout = ({children}: PropsWithChildren) => {
    const {token: {colorBgContainer, borderRadiusLG}} = theme.useToken();

    return <Layout>
        <AppNotification>
            <Content style={{padding: '0 48px', marginTop: "48px"}}>
                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 280,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Heading/>
                    {children}
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>
                {new Date().getFullYear()} <Link target="_blank" to="https://github.com">Gloeend</Link>
            </Footer>
        </AppNotification>
    </Layout>;
}