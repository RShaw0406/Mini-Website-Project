import {displayFailureMessage, getResults, renderHtml} from "../../html-generator";

describe('HTML Generator Tests', () => {
    describe('When calling renderHtml with a 1', () => {
        it('Should render the personalDetails HTML section correctly when called with a single applicant', () => {
            // Arrange
            document.body.innerHTML = '<div id="personal-details"></div>';
            // Act
            renderHtml(1, 1, true, false)
            // Assert
            expect(document.body.innerHTML).toMatchSnapshot();
        })
        it('Should render the personalDetails HTML section correctly when called with two applicants', () => {
            // Arrange
            document.body.innerHTML = '<div id="personal-details"></div>';
            // Act
            renderHtml(1, 2, false, false)
            // Assert
            expect(document.body.innerHTML).toMatchSnapshot();
        })
    })
    describe('When calling renderHtml with a 3', () => {
        it('Should render the employmentDetails HTML section correctly when called with a single applicant', () => {
            // Arrange
            document.body.innerHTML = '<div id="employment"></div>';
            // Act
            renderHtml(3, 1, true, false)
            // Assert
            expect(document.body.innerHTML).toMatchSnapshot();
        })
        it('Should render the employmentDetails HTML section correctly when called with two applicants', () => {
            // Arrange
            document.body.innerHTML = '<div id="employment"></div>';
            // Act
            renderHtml(3, 2, false, false)
            // Assert
            expect(document.body.innerHTML).toMatchSnapshot();
        })
    })
    describe('When calling renderHtml with a 4', () => {
        it('Should render the incomeDetails HTML section correctly when called with a single employed applicant', () => {
            // Arrange
            document.body.innerHTML = '<div id="income"></div>';
            // Act
            renderHtml(4, 1, true, false)
            // Assert
            expect(document.body.innerHTML).toMatchSnapshot();
        })
        it('Should render the incomeDetails HTML section correctly when called with a single unemployed applicant', () => {
            // Arrange
            document.body.innerHTML = '<div id="income"></div>';
            // Act
            renderHtml(4, 1, false, false)
            // Assert
            expect(document.body.innerHTML).toMatchSnapshot();
        })
        it('Should render the incomeDetails HTML section correctly when called with two employed applicants', () => {
            // Arrange
            document.body.innerHTML = '<div id="income"></div>';
            // Act
            renderHtml(4, 2, true, true)
            // Assert
            expect(document.body.innerHTML).toMatchSnapshot();
        })
        it('Should render the incomeDetails HTML section correctly when called with two unemployed applicants', () => {
            // Arrange
            document.body.innerHTML = '<div id="income"></div>';
            // Act
            renderHtml(4, 2, false, false)
            // Assert
            expect(document.body.innerHTML).toMatchSnapshot();
        })
        it('Should render the incomeDetails HTML section correctly when called with applicant1 employed and applicant2 unemployed', () => {
            // Arrange
            document.body.innerHTML = '<div id="income"></div>';
            // Act
            renderHtml(4, 2, true, false)
            // Assert
            expect(document.body.innerHTML).toMatchSnapshot();
        })
        it('Should render the incomeDetails HTML section correctly when called with applicant1 unemployed and applicant2 employed', () => {
            // Arrange
            document.body.innerHTML = '<div id="income"></div>';
            // Act
            renderHtml(4, 2, false, true)
            // Assert
            expect(document.body.innerHTML).toMatchSnapshot();
        })
    })
    describe('When calling renderHtml with a 5', () => {
        it('Should render the outgoingsDetails HTML section correctly when called with a single applicant', () => {
            // Arrange
            document.body.innerHTML = '<div id="outgoings"></div>';
            // Act
            renderHtml(5, 1, true, false)
            // Assert
            expect(document.body.innerHTML).toMatchSnapshot();
        })
        it('Should render the outgoingsDetails HTML section correctly when called with two applicants', () => {
            // Arrange
            document.body.innerHTML = '<div id="outgoings"></div>';
            // Act
            renderHtml(5, 2, false, false)
            // Assert
            expect(document.body.innerHTML).toMatchSnapshot();
        })
    })
    describe('When calling getResults with a valid amount', () => {
        it('Should render the results section correctly', () => {
            // Act
            const result = getResults(200000)
            // Assert
            expect(result).toMatchSnapshot()
        })
    })
    describe('When calling getResults with an invalid amount', () => {
        it('Should render the results section correctly', () => {
            // Act
            const result = getResults(0)
            // Assert
            expect(result).toMatchSnapshot()
        })
    })

    describe('When calling displayFailureMessage', () => {
        it('Should update the relevant classLists correctly', () => {
            // Arrange
            const failMessage = document.createElement('fail-message')
            failMessage.classList.add('d-none')
            const form = document.createElement('form')
            // Act
            displayFailureMessage(failMessage, form)
            // Assert
            expect([...failMessage.classList.values()]).toEqual([])
            expect([...form.classList.values()]).toEqual(['was-validated'])
        })
    })
})
