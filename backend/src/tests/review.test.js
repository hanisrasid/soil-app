async function importChai() {
    const chai = await import('chai');
    return chai;
}
const chaiHttp = require('chai-http');
const server = require('../../server');
const chai = importChai();
chai.use(chaiHttp);
const expect = chai.expect;

describe('Integration Tests for Review', () => {
    it('should add a review', (done) => {
        chai.request(server)
            .put('/api/review/')
            .send({comment:"test comment.", itemID: 0, stars:3,userID:1})
            .end((err, res)=> {
                expect(res).to.have.status(200);
                expect(res.body).to.deep.equal([
                    {
                        comment: "test comment.",
                        id: 1,
                        item: null,
                        itemID: null,
                        stars: 3,
                        user: { id: 1, fullName: 'Hanis Rasid' },
                        userID: 1
                    }
                ]);
                done();
            })
    });
})