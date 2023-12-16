def going_vertically(line_idx, char_idx, is_going_bottom, f)
  is_going_right = false

  while line_idx < f.size && line_idx >= 0
    char = f[line_idx][char_idx]

    if char == '.' || char == '|' || char == '#'
      f[line_idx][char_idx] = '#'
    elsif is_going_bottom == true
      is_going_right = true if /\\/.match?(char)
      
      f[line_idx][char_idx] = '#' unless char == '-'
      is_going_bottom = false
      break
    else
      is_going_right = true if char == '/'

      f[line_idx][char_idx] = '#' unless char == '-'
      break
    end

    line_idx += (is_going_bottom ? 1 : -1)
  end

  [line_idx, char_idx, is_going_right]
end

def going_horizontally(line_idx, char_idx, is_going_right, f)
  is_going_bottom = false

  while char_idx < f[0].size && char_idx >= 0
    char = f[line_idx][char_idx]
    
    if char == '.' || char == '-' || char == '#'
      f[line_idx][char_idx] = '#'
    elsif is_going_right == true
      is_going_bottom = true if /\\/.match?(char)

      f[line_idx][char_idx] = '#' unless char == '|'
      is_going_right = false
      break
    else
      is_going_bottom = true if char == '/'

      f[line_idx][char_idx] = '#' unless char == '|'
      break
    end

    char_idx += (is_going_right ? 1 : -1) 
  end

  [line_idx, char_idx, is_going_bottom]
end

f = File.new('texts/puzzle_16.txt').read.split("\n")

line_idx = 0
char_idx = 0
is_going_right = true
is_going_bottom = false

while line_idx < f.size && line_idx >= 0 && char_idx < f[0].size && char_idx >= 0
  line_idx, char_idx, is_going_bottom = going_horizontally(line_idx, char_idx, is_going_right, f)
  is_going_right = false
  if f[line_idx, char_idx] == '|'
    # CONTINUE HERE 
  end
  line_idx += (is_going_bottom ? 1 : -1)

  line_idx, char_idx, is_going_right = going_vertically(line_idx, char_idx, is_going_bottom, f)
  is_going_bottom = false
  char_idx += (is_going_right ? 1 : -1)
end

p f