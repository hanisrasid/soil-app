async function importChai() {
    const chai = await import('chai');
    return chai;
}
const chaiHttp = require('chai-http');
const server = require('../../server');
const chai = importChai();
chai.use(chaiHttp);
const expect = chai.expect;

describe('Integration Tests for Shopping Cart', () => {
    it('should add item to shopping cart', (done) => {
        chai.request(server)
            .put('/api/cart-item/1/increment')
            .send({
                description: "Grown without synthetic pesticides or fertilizers, organic apples are naturally sweet and crunchy, making them a healthy and delicious snack option.",
                id: 1,
                img: "https://images.unsplash.com/photo-1590005354167-6da97870c757?q=80&w=2962&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                name: "Organic Apples",
                price: "32.56",
                specialDay: 2,
                stockCount: 41
            })
            .end((err, res)=> {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message','Item successfully updated');
                done();
            })
    });
    it('should remove item from shopping cart', (done) => {
        chai.request(server)
        .delete('/api/cart-item/shopping-cart/delete/')
        .send({itemID: 1, cartID:1})
        .end((err, res)=>{
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message','Item removed from cart.');
            done();
        })
    });
    it('should check item count in shopping cart', (done) => {
        chai.request(server)
        .get('api/cart-item/shopping-cart/1')
        .end((err, res)=>{
            expect(res).to.have.status(200);
            expect(res.body).to.deep.equal([]);
            done();
        })
    })
})
