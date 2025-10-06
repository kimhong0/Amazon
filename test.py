def count(s, a):
    if not s:
        return 0
    else:
        return (1 if s[0] == a else 0) + count(s[1:], a)

user_input = input("Enter a string: ")
character = input("Enter a character to count: ")
print("Occurrences of", character, ":", count(user_input, character))