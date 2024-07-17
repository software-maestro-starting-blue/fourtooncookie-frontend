import { DiarySavedResponse } from '../pages/DiaryTimelinePage/DiaryTimelinePage';

const addres = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEBIREBIQEhEPFRIVEBEWDxURFRAVFhMXGBcXFhMaJyggGBolHRcYLTEiJSktLy8uGR81RDMsNygtLisBCgoKDg0OGxAQGzIlHyYwMDAwMistLTAvLS8vLS0tKzI1Ky01LS0tLS4tLS0tLy0rLS0tLTc1LS0tLS0tLS0tLf/AABEIAMIBBAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBAwQCB//EADoQAAICAgAEBAQDBwMDBQAAAAECAAMEEQUSITEGE0FRImFxgRQyoRUjM0JSkbFicsEHktEkNENTgv/EABoBAQADAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAvEQACAQMDAgMHBAMAAAAAAAAAAQIDETEEEiETQSIyUWFxgZGhwdEUM+HwBVJi/9oADAMBAAIRAxEAPwD7JERPFOgREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAERNeRelal7GVFHdmYKo+pPSAbIkTR4nwHYKmXisx6BRemyfl1ktDTQEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEoeLiJxO+7KyQbMeq16sSgn93y1nlaxk/mLNvv6S+SleDtUjIwm2LMW+3oe7VWOXrce4IP6THUSlGk3HP2LQScuT3x5OGUVBcqrHVHBCp5A22h2QKNgjm9PeSPgBLhw+kX+YD8fliz+ItXOfLD/Pl1+krn/Ua23yQnkK1DNVzZPOC9DmwAeXX0PN20d+v1l2z+K4+MB+Ivqr6dOexVLa9dHqY0sX0r5b9tyaj5O6JX08bcMJ0Mun17kqOnuSND/mTOHm1XLzVWV2L7o4cfpN3Fopc3xESAIiIAiIgCIiAIiIAiIgCJkKTMSWmgIiJAEREAREQBERAEREARE05uXXTW1trBK6xt2PYCAbpXuJeMsWqw018+TkDf7mhDYQR/Uw+Feuu56SHNuTxb4ibMXAP5EUlL8oa7sw/JWd9vWTvDuH046CuitK0H8qjW/mT3J+ZnPW1MKfGWXjTbI08V4vd/DxsXFX3uta5+3flr0P1nDd4dzbbkybc5VvrUqGqxFUchO+Vtn4136NLVE5Ja2o8WXw/JqqSK/4g8OvlXU3LkNUcfRrTylsUOCTz8rdObt6dNSoUcGsqymoyUS+6xfNF5bnNyq2jpn6o3UDU+nyC8ReHBlvVYtz02UhlDKobat3BB+g6y2n1Tj4JPwmGq0/Ug0skClCPslFdEBAQ8odB0JYeh1/xOJeFou76C1Nm/hspfy3Xr8IesfCynpsanVxzg9+HUtxvsyaa2AuQ1IGrq/rVh16Hv9flNDcaxSybvQhdcrgqHBP5QR6616TthJtboO6PAqUa+nkvsWnwr4psewYmbyC8gmm5eleUB3AH8tg9V/xLdPlfFcc3K1gJFlR5se9RyjzUOwW9RvoN9p9B8M8VGZiU5HY2L8Y/pcEq4+zAzS+5XPT0mo6secok5lhqAdT0xLGXSTj7Tqb5PEREoSIiIAiIgCIiAexYdannXrMTYXGu00T3+Z4K4wa4iJmWEREAREQBERAEREASj5Z/amW6ts4OA4Xl2OXKyB1PN7ont2Jk74z4q2Lh2vX1ufVVA9TbYeVdfMbJ+008C4YuJj1Y6dRUuif6mPVm+5JmGpq9OHGX/WXhG7O4TMRPHOkREQBERAMMAQQeoPQj3E4H4HilWTyKQHUq3LUqnRGjogdJIRLRlKOGQ0mfPh4a4klbV1tUFo35bc3M2WoO0Vl7J00CT6/LrLN/0vJOBs6HNfkHkH/xbsO0I9CDvofcSbkBwgjE4pZSNiriKG5B6DIr/igf7l0T9J6mm1LqXjLOfycr08KfMUXGekfU8xOqLad0VZncxMkzEh5JQiIgCIiAIiIAiJAX5hGeVsuykRVx/KqrpZqrWbm5+Zgjf6f5hNKVPe7FZOxPO2gSd6UEnSlj0G+ijqT8hOPh3Fasg2LX5nNSVFgemyoqWGwNOB111+495AcCz8yx05uUk4mQ1P79iLWGQiq9gK6U/wDd0M1+H6LFyWVaaRdjlBmW/tF2a/zQWLWoKgLGGyRsLo6AIE6f00Und8ld7LDl8VSuzygl9tgRbCtdRfSszKpLdANlG9fSSEq3iqgC0WOlTAppW/A5d7qidSHelgoG2Yjeu/1m7ibucCnluWvn8rTVUZCh6ipKoFrLWV/Dy9d+mum5D08XFWG53LHNd1yoAXYKCyKCT3Z2CqPqWIH3kFgX812Eq2XWCvHyksssqsqNrqMX4mVwNk9Tv5nr3nV4lUtUiBebzLatN5/kFLFsVqircrbPMo9PSU6FpqJO7i5JZOQlSF3PKq62dE9yAOg2T1InOnFaGpa8WA1IWDPysOUqdEFSN7B+U4fCWRdZSLrBZyXrXZUXyvOcgg9CoRQnTXbe/tODM0gbh7B95l1xW8vSSTdY+RvyQ3PyqDy716CXjQje3chyZPcT4lVjBTaX+IkKqVPazFVLNpEBOgASTOmm1XVXQhlcBlYdmVhsEfUGQnizHZ1BKrZVv+H+CXIKNo7cuzqFBB1/f3nbwDI83Gqs5ucWDmQ+UtOk7BeRSR017+spOlFU9yJUncgvFrF8/hlPQrz5F7+ujVVpCR7bY/eTchfEe04nw+wj4LEyqOb0Vyquv3PKR/eTU8XXeaPu+51UsCIicJqIkBxfxfiYt649pfnPLzEJta+btzHv7dge8n5eVOUUm1khNMREhfEHifHwTWt3OTbvQRQxVQdFm6jp+veRCEpvbFXYbSyTUTXj3LYiuh2rqrKfdWGwf7GbJBIld8Xsazh5K6BxsunmPr5du6nA998w6f8AiWKV7xqvPVRSOrZGVjIo+lnOT9NIZvpf3olKnlZdIiYnrnMZJmIiAIiIAiIgCIiAJkE/OYiLgCRnCuB1Y1ltiF2e8ksWIPKDY9hVdAdOaxjs7Pbr0Ek5xcZzjRSWRee1yK6K/wD7LX6ID7LvqT6KCfSaQlOT2p5KtJcnFxzgz5NiMHpKIjKabqrLqyxYHn8tXVWOhr4gZNougABoAAAAaA16Aeg+UrX7YyD+ECpu/nupyqWfyl8yujmY82jtezKQOoYTj44vmZaJdS6NqlkNVVl72lOV3VLSVrRVOgSV2QfTc6+lKSUW8FLrJbbshE/O6pv+pwu/7znzsarIUVs5BBrtU128rrpto4I9CQevrIvxzhizGfaU9eZbb7Kw/wCHp5Waw/1ablC/D1HPv0nnB1lZPnJd5fk0UJbXRclih/MduRm5SGTXbRB6+kpCkrbrkt9juwsnGpf8KtzNbsnlststbm5A3KHbYB5BvkB7ddRi8JNeRbetvS5+d6/Jr2T5YTRt/Nr4QZX8jzK8wO5xlvNiKtn7NzjV5tiCtWDGwVc5VgvMOutjcukVb0+U8iPJFcb4MMo1Eso8kuQj0rfWxYLolGOuYcvQ/wCoySqXlVQSCVABIUKDodwo6D6T1E5nUk47Xgvbm5VfGFu8rhlOyA99th6635NJIG/q0mJFePqmWmnLQcxwLltcepqIKW6//Lb+0kce5bFV0YMjgMjA7DAjYInm65Pwvsb0u5siInnmxBce4RglvxmUi7oXZcltEL22o6MdnoPpOE8fzrxzYuKiVn8tmTYVLD38pOoH39RJzjvC1y8eyhyVFgHxAbKlWDA69eoEgTh8Xr6D8FeB/Meelm17jqN/SdUJboLlNr/Z8Jewqkr8/QyOI8WTq1WDaPVUssrb6At0hRh8Uby8vHevJxwSamcq3I3TmV1PxpvX3/XyK+MHp5WCvzNth19h3ndwfgdy3/isqxHuFfl1pWpWupSdt36sSfX6yybim3ZPttfIkovF/iTtVYVQqgKqgBVHQKANAD5anuInGWEr/ih+S7htgPUZtaa9xajqf0lglcz2OVxLEx00Vw2OVknvyEKVqXfbmJYnR9Os6tGm6yfoZ1H4S6xET1TnEREAREQBERAEREAREw5Ojrvo66b666dPX6SUruwMzD2BRtmCj3LBR+sqP7by1TIY+Yxpt4ciq2PXTYxuyFFqBdlfiRlAJPTm7jvOfiuQcqpVyK6q/Msz6jbbhjKsxkVwq1oKjoOR/Ns/lHedcdK78szcy7MoJBIBK9VPQldjRIPpse0j8vgeNbZ5liMz/wBXnWrrYAOgGAXoB2nNxMnG87MIY1Y+A/xDQdjVzWaCt2PKPUa3OTMzM/Gwb7SjWWpXfYr2XUHyQlQKkrWih+uzy/Lv1lujNeWRG5d0TfEcFb6LKCSq2oa+YaJUEa2N9/vNXC+GCg2N5jWPcU5mKVpoIpAAVAB6mZ41nGjFuvXl5qq+cc2+UHp+bRHT7zgXiT8iFcnGyGOTj1uaUUKqOwBUjmc71s73uZwhUlFq/cltHqrgjjLbId6LVL86Cyh3tpHKAFrcvyJojuE9/rJuV/H4pavEVxrb6mrKNsfhjV+9bTV0izmIL8nMxHfWvnrgryeJ5eJjmgNVYVBbIa2lRaxUhH5F5iVDaYppdga2O0vOlKdtzQTSwXCYkYzNblYt1JL4zUZZLq37sl2xjUdepIV9H/d7yTnNUp7LF07mGUEEEAg9CCNgg+hHrPmlWQ+NlPTwkNlYwZvNpPSrGfuVryD0G9/l6yf8XZdmRcnDsdmTzF8zMtXvVRvXKD6M56fT5bkngYVdFa1UoErQaVR/yfU/OceorRpx2tXb7GkItu5y8C4wmXWXUFHQlbqm/PS4JBVh9pJSC4zwN2s/E4j+TlAAE6/d5Cj+S1fX/d3H+M8I8Rpa/kXocbKGt0uw+P51P2cfSefKmpLdTx6d1/Bsnbhk5ERMC4iIgCIiAVzxZxHNpX/01O6yB5uQNWvSN/Ey0dObQ3JXwRi4iY3NiWef5p5rr2JNltnqX31B+R7TulX4tR+zrv2jjgiskDPpUdHrJ/iqo/nUnfz6/Pfo6SvH9u1n6+vvMakXkvUTFbhgGU7DAEH3BGwZmdxiIiIAiIgCIiAIiIAiIgGp8as72iHmZHbag8z1lSjH3K8i6PpyiekoQKyhVCuXLgDQYuSXJ16kkz3Ev1JepFkRXD+A00vkeXXUtGTXUjUhPhJXzQ/MOxDBwPtOvF4Zj1I1ddNKV2b561rUK+xynmX12OnWdUSZVZvuFFAgHoQNH01019J4ahDoFE0rBlHKOjDsw+Y957iVU5LDFkeFoQb0ifEwdvhHxONac+7fCOvyEzj1LWqqihVQAKoGgoHYAT1Eb5PuLIj+D8IXFVUS29660CIj2BlRRrWgAOoA1JCIic3J3YSsUzhzcvFuIrZsPYMV6d9OepatHk9wGJ385YZr4/4dozQvmhlsq2arkbksqJ/pYf4MqviXhWTw/GN9XEMpgrVKVtFdoPPaqb5iPhAB/T5zkr6Xqy3JmsKllYt04eLcJpyk5Lk5gDtWBKshHYqw6gzuieWpOLujfJVhVxHB/ITn441pGYJkVj5N2s+/WSHDPE+Le3Jz+VcOjUWjyrFOu3K3f7bkzOLiXCcfJGr6q7B7soJH0buPsZt1IT8659V+MFbNYO2cfFeJV41TW2khFIHRSzMWOgFA7kkyFHhI1f8AtMzLxwOyFxdWNf6H+3r6SH8YcP4guHY12VVdXWUcgYvluCHXR5lOgBvZ6dty1OjTnNLdx8mRKUknwa28Z5hse1Kl8ityv4dkK2sg18XP/V8hsd+8018f4kCLy4fZBbE5EVAhP5Q/5gwH83v6HtMcLdSiHn82zY0/whG6+upzcXV/KPkuVdQSxKg7AB6L/wCZ3qEL7VFHzz/yFeU7XtyfQuA8VXLoW5VK8xYMh6lGViGBPr27zHiHIrrxMhrSAnlWBt+vMpAX5kk6185TPDv4u2zFxKmswcd8ZrlZWqve0FgTYWI2pYv9pcaPBePzrZfbk5RRuZFvuLore/ljQP3mK0SU91+D3urxY7vB9brw/EWzYcUVAg9x8I1+mpLxE7G7syEREAREQBERAEREAREQBERAEREAREQBERAPQUmeZ6DnWpjXTcu1Gy2/Ej3mJA+OcilMG5b1Z1uAqStfzWWOfgC/PfX7SekP4r4O2Xj8lbhLa3S2lj+UWVnahh7GVWSSp8G8S2YqV08TV62AAXJ/PW/bQdl3yuN6JPfW5asXNqtAaqyuwHsVdW+XpKrbxe6n4M3DyEJ2C9Vf4ilteoYdevsRIi/9lufhw7zYdfDXiXVuT9Br3/xPNlRlKXig0/8AnlHV4bcS+Z9JM5MniePV1supT/daq/5MqPh7wUMi025GPbRihTyU2X2G21iQedxv4AB6d5bcXwZw2vXLiUHXqy+Yf7tuarQx7yfyMnVNGN4hwrDpMnHJ9vOUE69gTO8MrjXwsCOo6MCPn7iZyPDOBZ+fExj6fwEB/uBIDjf/AE8xGqs/CVinIIBrbzLAmwwPKVB6A618t7k/oYdpNDqv0IvI8BjnYfiWrxXYsagihhttlRZ6Ls+0hsvhmDU5F+S+e6hlpxaR+87jfmNWfYdd69ekyMDFq0M3AzK3XfMSLb6ST6K6kg7knh8XxaRy4uJkknWlqwnBbfzIG/vLOVaLtaT+CX15IjQpN7uEdng7LZc9/wAZUab8qoLiAMrVpTUAxpXXUOO53316ev0GU3gPCcq/Jry8qvyK8cP+Hx+bmcuwKl7NdB8JOh85cp0RvtW5WfsKytfgRESSoiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAmzzBrsJriWjNxwQ1cCJkHUCRZATERIJEREAREQBMzEQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREA//Z'; 
const defaultImages = [addres, addres, addres, addres];

export async function getDiaries(pageNumber: number): Promise<DiarySavedResponse[] | null> {
    try {
        const response = await fetch(`http://localhost:8080/diary/timeline/1?pageNumber=${pageNumber}`);
        if (response.status === 204) {
            return null; // Indicating no more data to fetch
        }
        const data: DiarySavedResponse[] = await response.json();
        return data.map(diary => ({
            ...diary,
            paintingImageUrls: diary.paintingImageUrls.length ? diary.paintingImageUrls : defaultImages
        }));
    } catch (error) {
        console.error("Failed to fetch diaries", error);
        return null;
    }
}

export const deleteDiary = async (diaryId: number): Promise<boolean> => {
    try {
        const response = await fetch(`http://localhost:8080/diary/${diaryId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 204) {
            console.log(diaryId + " Diary deleted successfully");
            return true;
        } else {
            console.log("Failed to delete diary");
            return false;
        }
    } catch (error) {
        console.log("Error deleting diary: ", error);
        return false;
    }
};

export const toggleDiaryFavorite = async (diaryId: number, isFavorite: boolean): Promise<boolean> => {
    try {
        const response = await fetch(`http://localhost:8080/diary/favorite/${diaryId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(!isFavorite),
        });

        if (response.status === 200) {
            return true;
        } else {
            console.log("Failed to update favorite status");
            return false;
        }
    } catch (error) {
        console.log("Error updating favorite status: ", error);
        return false;
    }
};


